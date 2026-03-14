# DENCONE GPU 服务器部署指南

## 环境要求

- Ubuntu 20.04+ / Debian 11+
- 已安装 1Panel
- 域名已解析到服务器

## 部署步骤

### 1. 上传代码到服务器

```bash
# 方法1: 使用 Git (推荐)
cd /opt
git clone <你的仓库地址> dencone-gpu

# 方法2: 直接上传文件夹
scp -r ./dencone-gpu user@your-server:/opt/
```

### 2. 安装依赖

```bash
cd /opt/dencone-gpu

# 安装 Node.js (如果没有)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 PostgreSQL (或使用 1Panel 安装)
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 3. 配置数据库

```bash
# 创建数据库和用户
sudo -u postgres psql

# 在 PostgreSQL 命令行中执行:
CREATE DATABASE dencone;
CREATE USER dencone WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE dencone TO dencone;
\q
```

### 4. 配置后端

```bash
cd /opt/dencone-gpu/backend

# 复制环境配置
cp .env.example .env

# 编辑 .env 文件
nano .env
```

修改以下内容:
```
DATABASE_URL="postgresql://dencone:your-secure-password@localhost:5432/dencone"
JWT_SECRET="生成一个随机的密钥"
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://www.dencone.com
```

### 5. 初始化数据库

```bash
cd /opt/dencone-gpu/backend
npm install
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts  # 导入产品数据
```

### 6. 使用 PM2 部署

```bash
# 安装 PM2
sudo npm install -g pm2

# 启动后端
cd /opt/dencone-gpu/backend
pm2 start npm --name "dencone-backend" -- run dev

# 设置开机自启
pm2 startup
pm2 save
```

### 7. 构建前端

```bash
cd /opt/dencone-gpu/frontend

# 修改 API 地址
# 编辑 .env.production 或在 next.config.js 中配置

npm install
npm run build
```

### 8. 使用 1Panel 配置 Nginx

1. 打开 1Panel 面板
2. 添加网站: `www.dencone.com`
3. 配置 SSL 证书 (Let's Encrypt)
4. 配置反向代理:

**后端 API:**
- 代理地址: `http://127.0.0.1:3001`
- 路径: `/api`

**前端:**
- 根目录: `/opt/dencone-gpu/frontend/out`
- 或者使用 PM2 运行前端

### 9. 完整的 Nginx 配置 (可选)

如果不用 1Panel, 可手动配置:

```nginx
server {
    listen 80;
    server_name www.dencone.com dencone.com;
    
    # 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.dencone.com dencone.com;
    
    ssl_certificate /etc/letsencrypt/live/www.dencone.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.dencone.com/privkey.pem;
    
    # 前端静态文件
    location / {
        root /opt/dencone-gpu/frontend/out;
        try_files $uri $uri/ /index.html;
    }
    
    # API 反向代理
    location /api {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 10. 测试部署

```bash
# 检查服务状态
pm2 status

# 检查端口
curl http://localhost:3001/api/health

# 检查网站
curl https://www.dencone.com
```

## 常用命令

```bash
# 重启后端
pm2 restart dencone-backend

# 查看日志
pm2 logs dencone-backend

# 停止所有服务
pm2 stop all

# 更新代码后重部署
cd /opt/dencone-gpu
git pull
cd backend && npm install
pm2 restart dencone-backend
cd ../frontend && npm run build
```

## 1Panel 快速部署 (推荐)

1. 在 1Panel 中安装 **Node.js** 应用
2. 安装 **PostgreSQL** 数据库
3. 上传代码到 `/opt/dencone-gpu`
4. 在 1Panel 中配置反向代理

---

需要更详细的帮助请告诉我!
