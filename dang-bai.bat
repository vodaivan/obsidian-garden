@echo off
chcp 65001 >nul
title Dang bai len Gia Dinh 222

echo.
echo  ================================================
echo   Gia Dinh 222 - Tu dong dang bai len web
echo  ================================================
echo.

set GARDEN=B:\OneDrive - Chonnam National University\3 Resources\Obsidian\Family Knowledge System\my-garden
set PUBLISH=B:\OneDrive - Chonnam National University\3 Resources\Obsidian\Family Knowledge System\_Publish

cd /d "%GARDEN%"

echo [1/4] Dong bo bai viet tu _Publish vao content...
for %%f in ("%PUBLISH%\*.md") do (
    echo   + Copy: %%~nxf
    copy /Y "%%f" "%GARDEN%\content\" >nul
)
echo   Hoan thanh dong bo.
echo.

echo [2/4] Kiem tra thay doi...
git status --short
echo.

git add .

set /p msg="Ten commit (Enter de dung ten mac dinh): "
if "%msg%"=="" set msg=Cap nhat bai viet

echo.
echo [3/4] Luu thay doi: %msg%
git commit -m "%msg%"

echo.
echo [4/4] Day len GitHub...
git push

echo.
echo  ================================================
echo   Hoan thanh! Web se cap nhat sau khoang 1 phut.
echo  ================================================
echo.
pause
