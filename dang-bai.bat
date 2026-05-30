@echo off
chcp 65001 >nul
title Dang bai len Gia Dinh 222

echo.
echo  ====================================
echo   Gia Dinh 222 - Dang bai len web
echo  ====================================
echo.

cd /d "B:\OneDrive - Chonnam National University\3 Resources\Obsidian\Family Knowledge System\my-garden"

echo [1/3] Kiem tra thay doi...
git status --short
echo.

git add .

set /p msg="Tieu de commit (Enter de dung ten mac dinh): "
if "%msg%"=="" set msg=Cap nhat bai viet moi

echo.
echo [2/3] Dang luu: %msg%
git commit -m "%msg%"

echo.
echo [3/3] Dang day len GitHub...
git push

echo.
echo  ====================================
echo   Hoan thanh! Web se cap nhat sau ~1 phut.
echo   Link: https://obsidian-garden.vercel.app
echo  ====================================
echo.
pause
