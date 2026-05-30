$ErrorActionPreference = 'Stop'
$GARDEN  = Split-Path -Parent $MyInvocation.MyCommand.Path
$VAULT   = Split-Path -Parent $GARDEN
$PUBLISH = Join-Path $VAULT '_Publish'
$CONTENT = Join-Path $GARDEN 'content'
$IMAGES  = Join-Path $GARDEN 'public\images'

if (!(Test-Path $CONTENT)) { New-Item -ItemType Directory -Path $CONTENT | Out-Null }
if (!(Test-Path $IMAGES))  { New-Item -ItemType Directory -Path $IMAGES  | Out-Null }

Write-Host ''
Write-Host '================================================' -ForegroundColor Cyan
Write-Host '  Gia Dinh 222 - Auto Publish to Web' -ForegroundColor Cyan
Write-Host '================================================' -ForegroundColor Cyan
Write-Host ''

Write-Host '[1/4] Syncing posts from _Publish...' -ForegroundColor Cyan
$newPosts = 0; $updatedPosts = 0; $imagesCopied = 0

Get-ChildItem -Path $PUBLISH -Filter '*.md' | ForEach-Object {
    $dest = Join-Path $CONTENT $_.Name
    if (!(Test-Path $dest)) { $newPosts++; Write-Host ('+  New:     ' + $_.Name) -ForegroundColor Green }
    else { $updatedPosts++; Write-Host ('~  Updated: ' + $_.Name) -ForegroundColor Yellow }
    Copy-Item $_.FullName $dest -Force

    # Find image refs and copy them
    $text = Get-Content $_.FullName -Raw -Encoding UTF8
    $imgExts = 'png|jpg|jpeg|webp|gif|svg|avif'
    $refs = [regex]::Matches($text, "!\[\[([^\]|]+\.($imgExts))(?:\|[^\]]*)?\]\]", 'IgnoreCase')
    foreach ($m in $refs) {
        $imgName = $m.Groups[1].Value.Trim()
        $imgDest = Join-Path $IMAGES $imgName
        $found = Get-ChildItem -Path $VAULT -Filter $imgName -Recurse -ErrorAction SilentlyContinue |
            Where-Object { $_.FullName -ne $imgDest } |
            Select-Object -First 1
        if ($found) {
            Copy-Item $found.FullName $imgDest -Force
            $imagesCopied++
            Write-Host ('   Image:   ' + $imgName) -ForegroundColor Magenta
        } else {
            Write-Host ('   Missing: ' + $imgName) -ForegroundColor Red
        }
    }
}

$totalPosts  = (Get-ChildItem -Path $CONTENT -Filter '*.md').Count
$totalImages = @(Get-ChildItem -Path $IMAGES -ErrorAction SilentlyContinue).Count

Write-Host ''
Write-Host ("   Total: $totalPosts posts, $totalImages images") -ForegroundColor Cyan
Write-Host ''

Set-Location $GARDEN

Write-Host '[2/4] Checking changes...' -ForegroundColor Cyan
git status --short
Write-Host ''

git add .

# Build smart commit message
$date  = Get-Date -Format 'yyyy-MM-dd'
$parts = @()
if ($newPosts     -gt 0) { $parts += "added $newPosts post$(if($newPosts -gt 1){'s'})" }
if ($updatedPosts -gt 0) { $parts += "updated $updatedPosts post$(if($updatedPosts -gt 1){'s'})" }
if ($imagesCopied -gt 0) { $parts += "$imagesCopied image$(if($imagesCopied -gt 1){'s'})" }
if ($parts.Count  -eq 0) { $parts += 'sync' }
$autoMsg = 'content: ' + ($parts -join ', ') + " [total: $totalPosts posts] $date"

Write-Host '[3/4] Commit message (Enter = auto):' -ForegroundColor Cyan
Write-Host "  Auto: $autoMsg" -ForegroundColor DarkGray
$custom = Read-Host '  Custom'
$msg = if ($custom.Trim() -ne '') { $custom.Trim() + " [total: $totalPosts] $date" } else { $autoMsg }

git commit -m $msg

Write-Host ''
Write-Host '[4/4] Pushing to GitHub...' -ForegroundColor Cyan
git push

Write-Host ''
Write-Host '================================================' -ForegroundColor Green
Write-Host "  Done! $totalPosts posts live. Web updates in ~1 min." -ForegroundColor Green
Write-Host '================================================' -ForegroundColor Green
Write-Host ''
