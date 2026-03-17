#!/bin/bash

# =============================================
# SUNCITY GPU Cloud 手动部署脚本
# Ubuntu 24.04
# =============================================

set -e

echo "=== SUNCITY 部署开始 ==="

# =============================================
# 1. 安装 PostgreSQL
# =============================================
echo "[1/6] 安装 PostgreSQL..."

apt update

# 添加 PostgreSQL 官方仓库
apt install -y curl ca-certificates gnupg
curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor -o /usr/share/keyrings/postgresql.gpg
echo "deb [signed-by=/usr/share/keyrings/postgresql.gpg] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list

apt update
apt install -y postgresql-16 postgresql-contrib-16

# 启动
systemctl start postgresql
systemctl enable postgresql

# =============================================
# 2. 创建数据库
# =============================================
echo "[2/6] 创建数据库..."

sudo -u postgres psql << EOF
CREATE DATABASE suncity;
CREATE USER suncity WITH PASSWORD 'suncity123';
GRANT ALL PRIVILEGES ON DATABASE suncity TO suncity;
ALTER DATABASE suncity OWNER TO suncity;
\c suncity
GRANT ALL ON SCHEMA public TO suncity;
\q
EOF

echo "数据库创建完成: suncity / suncity123"

# =============================================
# 3. 安装 Node.js 和 PM2
# =============================================
echo "[3/6] 安装 Node.js..."

# 清理旧版本
apt remove -y nodejs npm 2>/dev/null || true

# 添加 NodeSource 仓库
mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

apt update
apt install -y nodejs

# 安装 PM2
npm install -g pm2
pm2 install pm2-logrotate

# 安装 PM2
npm install -g pm2
pm2 install pm2-logrotate

# =============================================
# 4. 克隆代码
# =============================================
echo "[4/6] 克隆代码..."

if [ -d "/opt/suncity" ]; then
    cd /opt/suncity
    git pull
else
    git clone https://github.com/Minerlgx/suncity-gpu.git /opt/suncity
    cd /opt/suncity
fi

# =============================================
# 5. 配置并启动后端
# =============================================
echo "[5/6] 配置后端..."

cd /opt/suncity/backend

# 创建 .env
cat > .env << EOF
DATABASE_URL="postgresql://suncity:suncity123@localhost:5432/suncity"
JWT_SECRET=$(openssl rand -base64 32)
NODE_ENV=production
PORT=3001
FRONTEND_URL=http://localhost:3000
EOF

# 安装依赖
npm install
npx prisma generate

# 创建数据库表
npx prisma db push

# 启动后端
pm2 delete suncity-backend 2>/dev/null || true
pm2 start npm --name suncity-backend -- run dev
pm2 save

# =============================================
# 6. 配置前端
# =============================================
echo "[6/6] 配置前端..."

cd /opt/suncity/frontend

# 创建 .env.local
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001/api
EOF

npm install
npm run build

# 启动前端
pm2 delete suncity-frontend 2>/dev/null || true
pm2 start npm --name suncity-frontend -- run start
pm2 save

# =============================================
# 7. 配置 Nginx 反向代理
# =============================================
echo "[7/7] 配置 Nginx..."

# 安装 Nginx
apt install -y nginx

# 创建配置
cat > /etc/nginx/sites-available/suncity << EOF
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# 启用配置
ln -sf /etc/nginx/sites-available/suncity /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
systemctl enable nginx

# =============================================
# 完成
# =============================================
echo ""
echo "=== 部署完成 ==="
echo ""
echo "前端: http://你的服务器IP"
echo "后端: http://你的服务器IP:3001"
echo ""
echo "管理命令:"
echo "  pm2 status          - 查看状态"
echo "  pm2 logs            - 查看日志"
echo "  pm2 restart all     - 重启"
echo ""
echo "如需域名，配置 DNS 后修改 /etc/nginx/sites-available/suncity"
