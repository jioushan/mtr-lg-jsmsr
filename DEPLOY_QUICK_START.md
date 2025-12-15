# JSMSR Network LookingGlass - 部署指南

## 📋 部署前檢查

### 系統要求

- **服務器**：Linux x86_64 或 ARM64
- **Docker**：20.10+（推薦）
- **Node.js**：18+（用於手動部署）
- **Web 服務器**：Nginx 或 Apache

### 網路要求

- 出站 HTTPS 訪問（到 mtr.api.jsmsr.eu.org）
- 入站 HTTP/HTTPS 端口（80/443）

## 🚀 部署選項

### 選項 1：Docker Compose（推薦）

```bash
# 1. 複製部署文件
scp docker-compose.yml nginx.conf Dockerfile deploy.sh server:/path/to/app/

# 2. 在服務器上運行
cd /path/to/app
docker-compose up -d

# 3. 檢查狀態
docker-compose ps
curl http://localhost
```

### 選項 2：手動 Docker 部署

```bash
# 1. 構建鏡像
docker build -t lookingglass .

# 2. 運行容器
docker run -d \
  --name lookingglass \
  -p 8080:80 \
  --restart unless-stopped \
  lookingglass

# 3. 檢查運行狀態
docker ps
curl http://localhost:8080
```

### 選項 3：傳統部署

```bash
# 1. 複製源代碼（排除 node_modules）
rsync -av \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='dist' \
  ./ server:/path/to/app/

# 2. 在服務器上安裝和構建
ssh server
cd /path/to/app
npm ci --only=production
npm run build

# 3. 配置 Web 服務器
# 將 dist/ 目錄配置為網站根目錄
```

## 🔧 Nginx 配置示例

```nginx
server {
    listen 80;
    server_name lg.jsmsr.com;
    root /path/to/dist;
    index index.html;

    # 啟用 gzip
    gzip on;
    gzip_types text/css application/javascript text/javascript application/json;

    # 處理 React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理（如果需要）
    location /api/ {
        proxy_pass https://mtr.api.jsmsr.eu.org/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 安全頭
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## 🔍 故障排除

### 常見問題

#### Docker 部署問題

```bash
# 檢查容器狀態
docker-compose ps

# 查看日誌
docker-compose logs -f

# 重新構建
docker-compose build --no-cache
docker-compose up -d
```

#### 構建問題

```bash
# 清除緩存
rm -rf node_modules dist
npm install
npm run build
```

#### 網路問題

```bash
# 測試 API 連通性
curl -I https://mtr.api.jsmsr.eu.org/mtr?ip=8.8.8.8

# 檢查防火牆
sudo ufw status
sudo iptables -L
```

### 性能優化

1. **啟用 HTTP/2**
2. **配置 CDN**
3. **設置緩存頭**
4. **監控資源使用**

## 📊 監控和維護

### 健康檢查

```bash
# Docker 容器健康檢查
docker ps --filter "name=lookingglass"

# 應用健康檢查
curl -f http://localhost/health || echo "Service unhealthy"
```

### 日誌管理

```bash
# 查看應用日誌
docker-compose logs -f lookingglass

# 日誌輪轉
# 配置 logrotate 或使用專門的日誌管理工具
```

### 更新部署

```bash
# 停止服務
docker-compose down

# 拉取最新代碼
git pull origin main

# 重新構建和啟動
docker-compose build --no-cache
docker-compose up -d

# 清理舊鏡像
docker image prune -f
```

## 🔒 安全注意事項

1. **HTTPS 強制**：始終使用 HTTPS
2. **防火牆**：只開放必要端口
3. **定期更新**：保持依賴項更新
4. **監控訪問**：設置日誌和監控

## 📞 支持

如遇部署問題，請提供：
- 錯誤信息和日誌
- 系統信息（OS、Docker 版本等）
- 部署步驟詳情

聯繫：JSMSR Network 技術支持