#!/bin/bash

# JSMSR Network LookingGlass 部署腳本
# 用於在服務器上正確構建和部署項目

set -e

echo "🚀 開始部署 JSMSR Network LookingGlass..."

# 檢查 Node.js 版本
echo "📋 檢查 Node.js 版本..."
node --version
npm --version

# 安裝依賴
echo "📦 安裝依賴..."
npm ci --only=production

# 檢查代碼
echo "🔍 檢查代碼..."
npm run lint

# 構建項目
echo "🔨 構建項目..."
npm run build

# 檢查構建結果
if [ -d "dist" ]; then
    echo "✅ 構建成功！"
    echo "📊 構建文件大小："
    du -sh dist/
    echo "📁 構建文件列表："
    ls -la dist/
else
    echo "❌ 構建失敗！"
    exit 1
fi

echo "🎉 部署完成！"
echo "💡 提示：請將 dist/ 目錄部署到您的 Web 服務器"