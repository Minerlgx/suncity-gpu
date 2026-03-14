#!/bin/bash

# DENCONE 一键部署脚本

set -e

echo "=== DENCONE 部署开始 ==="

# 1. 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "安装 Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

# 2. 安装 PostgreSQL
if ! command -v psql &> /dev/null; then
    echo "安装 PostgreSQL..."
    apt update
    apt install -y postgresql postgresql-contrib
    systemctl start postgresql
    systemctl enable postgresql
fi

# 3. 配置数据库
echo "配置数据库..."
sudo -u postgres psql -c "CREATE DATABASE dencone;" 2>/dev/null || true
sudo -u postgres psql -c "CREATE USER dencone WITH PASSWORD 'dencone123';" 2>/dev/null || true
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE dencone TO dencone;" 2>/dev/null || true
sudo -u postgres psql -c "ALTER DATABASE dencone OWNER TO dencone;" 2>/dev/null || true

# 4. 安装 PM2
if ! command -v pm2 &> /dev/null; then
    echo "安装 PM2..."
    npm install -g pm2
fi

# 5. 克隆代码
echo "获取代码..."
if [ -d "/opt/dencone-gpu" ]; then
    cd /opt/dencone-gpu
    git pull
else
    cd /opt
    git clone https://github.com/Minerlgx/dencone-gpu.git
    cd dencone-gpu
fi

# 6. 配置后端
echo "配置后端..."
cd /opt/dencone-gpu/backend
cp .env.example .env 2>/dev/null || true

# 创建 .env 文件
cat > .env << EOF
DATABASE_URL="postgresql://dencone:dencone123@localhost:5432/dencone"
JWT_SECRET="$(openssl rand -base64 32)"
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://www.dencone.com
EOF

# 安装依赖
echo "安装后端依赖..."
npm install
npx prisma generate
npx prisma db push

# 导入产品数据
echo "导入产品数据..."
npx tsx prisma/seed.ts 2>/dev/null || true

# 7. 启动后端
echo "启动后端..."
pm2 delete dencone-backend 2>/dev/null || true
pm2 start npm --name dencone-backend -- run dev

# 8. 配置前端
echo "配置前端..."
cd /opt/dencone-gpu/frontend
cp .env.production .env.local 2>/dev/null || true
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=https://www.dencone.com/api
EOF

npm install
npm run build

# 9. 设置 PM2 开机自启
pm2 startup
pm2 save

echo "=== 部署完成 ==="
echo ""
echo "后端运行: pm2 status dencone-backend"
echo "后端日志: pm2 logs dencone-backend"
echo ""
echo "下一步: 用 1Panel 配置 Nginx 反向代理"
