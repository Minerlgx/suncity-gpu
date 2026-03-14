# 服务器部署 - 快速调试指南

## 检查后端状态

```bash
# 1. 查看后端日志
pm2 logs dencone-backend

# 2. 检查端口是否运行
curl http://localhost:3001/api/health
```

## 常见问题

### 1. 数据库连接失败
```bash
# 检查数据库是否运行
sudo systemctl status postgresql

# 测试数据库连接
psql -U dencone -d dencone -h localhost
```

### 2. .env 文件未创建
```bash
# 在 /opt/dencone-gpu/backend 目录
cp .env.example .env
nano .env
```

### 3. Prisma 未初始化
```bash
cd /opt/dencone-gpu/backend
npx prisma generate
npx prisma db push
```

### 4. 端口被占用
```bash
# 杀掉占用 3001 端口的进程
lsof -ti:3001 | xargs kill -9

# 重启后端
pm2 restart dencone-backend
```

## 完整重置步骤

```bash
cd /opt/dencone-gpu

# 1. 停止服务
pm2 stop all

# 2. 安装依赖
cd backend && npm install
cd ../frontend && npm install

# 3. 配置后端环境变量
cd ../backend
cp .env.example .env
nano .env  # 修改数据库密码等

# 4. 初始化数据库
npx prisma generate
npx prisma db push

# 5. 启动服务
pm2 start npm --name dencone-backend -- run dev
```

## 需要确认的配置

在 `backend/.env` 文件中:
```
DATABASE_URL="postgresql://dencone:你的密码@localhost:5432/dencone"
JWT_SECRET="任意32位随机字符串"
FRONTEND_URL=https://www.dencone.com  # 或你的域名
```

请在服务器上运行 `pm2 logs dencone-backend` 看看具体报错是什么？
