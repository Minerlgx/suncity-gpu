#!/bin/bash

# =============================================
# SUNCITY GPU Cloud 一键部署脚本
# Ubuntu 24.04 专用
# =============================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=== SUNCITY 一键部署开始 ===${NC}"

# =============================================
# 1. 安装基础软件
# =============================================
echo -e "${YELLOW}[1/5] 安装基础软件...${NC}"

apt update
apt install -y curl wget git vim

# =============================================
# 2. 安装 Node.js 20
# =============================================
echo -e "${YELLOW}[2/5] 安装 Node.js 20...${NC}"

if ! command -v node &> /dev/null || [[ $(node -v | cut -d. -f1 | tr -d 'v') -lt 20 ]]; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
fi

node -v
npm -v

# =============================================
# 3. 安装 PostgreSQL
# =============================================
echo -e "${YELLOW}[3/5] 安装 PostgreSQL...${NC}"

if ! command -v psql &> /dev/null; then
    apt install -y postgresql postgresql-contrib
    systemctl start postgresql
    systemctl enable postgresql
fi

# 创建数据库和用户
sudo -u postgres psql -c "CREATE DATABASE suncity;" 2>/dev/null || true
sudo -u postgres psql -c "CREATE USER suncity WITH PASSWORD 'suncity123';" 2>/dev/null || true
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE suncity TO suncity;" 2>/dev/null || true
sudo -u postgres psql -c "ALTER DATABASE suncity OWNER TO suncity;" 2>/dev/null || true

echo -e "${GREEN}数据库: suncity / suncity123${NC}"

# =============================================
# 4. 安装 PM2
# =============================================
echo -e "${YELLOW}[4/5] 安装 PM2...${NC}"

npm install -g pm2
pm2 install pm2-logrotate

# =============================================
# 5. 部署代码
# =============================================
echo -e "${YELLOW}[5/5] 部署代码...${NC}"

# 克隆代码
mkdir -p /opt
cd /opt

if [ -d "/opt/suncity" ]; then
    cd /opt/suncity
    git pull
else
    git clone https://github.com/Minerlgx/suncity-gpu.git /opt/suncity
    cd /opt/suncity
fi

chmod -R 755 /opt/suncity

# 后端
cd /opt/suncity/backend
cat > .env << EOF
DATABASE_URL="postgresql://suncity:suncity123@localhost:5432/suncity"
JWT_SECRET=$(openssl rand -base64 32)
NODE_ENV=production
PORT=3001
FRONTEND_URL=http://localhost:3000
EOF

npm install --unsafe-perm=true --allow-root 2>/dev/null || npm install
npx prisma generate
npx prisma db push

# 启动后端
pm2 delete suncity-backend 2>/dev/null || true
pm2 start npm --name suncity-backend -- run dev

# 前端
cd /opt/suncity/frontend
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001/api
EOF

npm install --unsafe-perm=true --allow-root 2>/dev/null || npm install
npm run build

pm2 delete suncity-frontend 2>/dev/null || true
pm2 start npm --name suncity-frontend -- run start
pm2 save

# =============================================
# 完成
# =============================================
echo ""
echo -e "${GREEN}=== 部署完成 ===${NC}"
echo ""
echo "前端: http://localhost:3000"
echo "后端: http://localhost:3001"
echo ""
echo "管理命令:"
echo "  pm2 status"
echo "  pm2 logs"
