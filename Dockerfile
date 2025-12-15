# JSMSR Network LookingGlass - 多架構 Docker 鏡像
FROM node:18-alpine AS base

# 安裝必要的系統依賴
RUN apk add --no-cache git

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴（僅生產依賴）
RUN npm ci --only=production && npm cache clean --force

# 複製源代碼
COPY . .

# 構建應用
RUN npm run build

# 生產階段
FROM nginx:alpine AS production

# 複製自定義 nginx 配置（如果有的話）
# COPY nginx.conf /etc/nginx/nginx.conf

# 從構建階段複製構建文件
COPY --from=base /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"]