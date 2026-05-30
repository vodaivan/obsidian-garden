@echo off
chcp 65001 >nul
title Gia Dinh 222 - Auto Publish

echo.
echo  ================================================
echo   Gia Dinh 222 - Auto Publish to Web
echo  ================================================
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "& {
    $ErrorActionPreference = 'Stop'
    $GARDEN  = 'B:\OneDrive - Chonnam National University\3 Resources\Obsidian\Family Knowledge System\my-garden'
    $PUBLISH = 'B:\OneDrive - Chonnam National University\3 Resources\Obsidian\Family Knowledge System\_Publish'
    $CONTENT = Join-Path $GARDEN 'content'
    $IMAGES  = Join-Path $GARDEN 'public\images'

    # Create folders if needed
    if (!(Test-Path $CONTENT)) { New-Item -ItemType Directory -Path $CONTENT | Out-Null }
    if (!(Test-Path $IMAGES))  { New-Item -ItemType Directory -Path $IMAGES  | Out-Null }

    Write-Host '[1/4] Syncing posts from _Publish...' -ForegroundColor Cyan
    $newPosts = 0; $updatedPosts = 0; $imagesCopied = 0

    # Copy all .md files
    Get-ChildItem -Path $PUBLISH -Filter '*.md' | ForEach-Object {
        $dest = Join-Path $CONTENT $_.Name
        if (!(Test-Path $dest)) { $newPosts++; Write-Host ('+  New:     ' + $_.Name) -ForegroundColor Green }
        else                    { $updatedPosts++; Write-Host ('~  Updated: ' + $_.Name) -ForegroundColor Yellow }
        Copy-Item $_.FullName $dest -Force

        # Find ![[image]] refs in this file and copy images
        $text = Get-Content $_.FullName -Raw
        $refs = [regex]::Matches($text, '!\[\[([^\]|]+\.(png|jpg|jpeg|webp|gif|svg|avif))(?:\|[^\]]*)?\]\]', 'IgnoreCase')
        foreach ($m in $refs) {
            $imgName = $m.Groups[1].Value.Trim()
            # Search entire vault for this image
            $found = Get-ChildItem -Path 'B:\OneDrive - Chonnam National University\3 Resources\Obsidian\Family Knowledge System' -Filter $imgName -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
            if ($found) {
                $imgDest = Join-Path $IMAGES $imgName
                Copy-Item $found.FullName $imgDest -Force
                $imagesCopied++
                Write-Host ('   Image:   ' + $imgName) -ForegroundColor Magenta
            } else {
                Write-Host ('   Missing: ' + $imgName) -ForegroundColor Red
            }
        }
    }

    # Count totals
    $totalPosts = (Get-ChildItem -Path $CONTENT -Filter '*.md').Count
    $totalImages = (Get-ChildItem -Path $IMAGES -ErrorAction SilentlyContinue).Count

    Write-Host ''
    Write-Host ('   Total: ' + $totalPosts + ' posts, ' + $totalImages + ' images') -ForegroundColor Cyan
    Write-Host ''

    Set-Location $GARDEN

    Write-Host '[2/4] Checking changes...' -ForegroundColor Cyan
    git status --short
    Write-Host ''

    git add .

    # Build smart commit message
    \$date = Get-Date -Format 'yyyy-MM-dd'
    \$parts = @()
    if (\$newPosts -gt 0)     { \$parts += \"added \$newPosts new post\$(if(\$newPosts -gt 1){'s'})\" }
    if (\$updatedPosts -gt 0) { \$parts += \"updated \$updatedPosts post\$(if(\$updatedPosts -gt 1){'s'})\" }
    if (\$imagesCopied -gt 0) { \$parts += \"\$imagesCopied image\$(if(\$imagesCopied -gt 1){'s'})\" }
    if (\$parts.Count -eq 0)  { \$parts += 'sync' }

    \$autoMsg = 'content: ' + (\$parts -join ', ') + ' [total: ' + \$totalPosts + ' posts] ' + \$date

    Write-Host '[3/4] Commit message (press Enter to use auto, or type custom):' -ForegroundColor Cyan
    Write-Host ('  Auto: ' + \$autoMsg) -ForegroundColor DarkGray
    \$custom = Read-Host '  Custom'

    \$msg = if (\$custom.Trim() -ne '') { \$custom.Trim() + ' [total: ' + \$totalPosts + '] ' + \$date } else { \$autoMsg }

    git commit -m \$msg

    Write-Host ''
    Write-Host '[4/4] Pushing to GitHub...' -ForegroundColor Cyan
    git push

    Write-Host ''
    Write-Host '  ================================================' -ForegroundColor Green
    Write-Host ('   Done! ' + \$totalPosts + ' posts live. Web updates in ~1 min.') -ForegroundColor Green
    Write-Host '  ================================================' -ForegroundColor Green
}"

echo.
pause
