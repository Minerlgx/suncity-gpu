# Suncity GPU Cloud - 新项目启动

## 项目信息

- **名称**: Suncity GPU Cloud
- **类型**: 裸金属 GPU 服务器租赁平台
- **目标市场**: AI/ML 部署、大语言模型、深度学习
- **数据中心**: 马来西亚、印尼、日本（亚太地区）
- **语言**: 英文
- **部署**: Ubuntu + 1Panel

## 快速开始

### 1. 安装依赖

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 2. 配置环境变量

```bash
# Backend
cp backend/.env.example backend/.env
# 编辑 .env 配置数据库等

# Frontend  
cp frontend/.env.production frontend/.env.local
```

### 3. 启动开发服务器

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

访问 http://localhost:3000

### 4. 生产部署

见 DEPLOY.md

## 功能列表

- [x] 产品展示（GPU服务器列表）
- [x] 用户注册/登录
- [x] Dashboard
- [x] 订单管理
- [x] 实例管理
- [x] 管理后台

## 数据中心

1. **Malaysia (KL)** - 吉隆坡
2. **Indonesia (JKT)** - 雅加达  
3. **Japan (TYO)** - 东京

## 产品

- H100 80GB (马来西亚/日本/印尼)
- H200 141GB (日本)
- A100 80GB (马来西亚)
- RTX 4090 x4/x8 (日本/马来西亚)
- RTX 4080 SUPER
- H100 推理优化（日本）

## 技术栈

- Frontend: Next.js + Tailwind CSS
- Backend: Express + Prisma
- Database: PostgreSQL

## 管理员

- Email: admin@suncityd.com
- Password: admin123
