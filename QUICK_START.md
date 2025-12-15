# mtr LookingGlass - 快速入門

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動開發服務器

```bash
npm run dev
```

訪問 http://localhost:5173 查看應用。

### 3. 構建生產版本

```bash
npm run build
```

## 📦 快速部署

### 使用 Docker（推薦）

```bash
# 構建並啟動
docker-compose up -d

# 查看狀態
docker-compose ps

# 查看日誌
docker-compose logs -f
```

### 傳統部署

```bash
# 複製源代碼到服務器（排除 node_modules）
rsync -av --exclude='node_modules' --exclude='.git' ./ server:/path/to/app/

# 在服務器上
cd /path/to/app
npm ci --only=production
npm run build

# 使用 nginx 提供 dist/ 目錄
```

## 🔧 故障排除

### 常見問題

1. **主題不生效**：確保瀏覽器支持 CSS 自定義屬性
2. **API 請求失敗**：檢查 CORS 設置和 API 端點可用性
3. **構建失敗**：確保 Node.js 版本 >= 18

### 檢查 API 端點

```bash
# 測試 MTR API
curl "https://<domain.com>/mtr?ip=8.8.8.8"
```
