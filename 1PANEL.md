# 1Panel Nginx 反向代理配置指南

## 前置条件

1. 域名已解析到服务器 IP
2. 1Panel 已安装并正常运行
3. 后端服务已在运行 (`pm2 status` 能看到 dencone-backend)

---

## 步骤 1: 在 1Panel 中添加网站

1. 登录 1Panel 面板
2. 进入 **网站** → **创建网站**
3. 填写:
   - 域名: `www.dencone.com` (和 `dencone.com`)
   - 类型: **PHP** 或 **静态网站** (都可以，后面我们会改)
   - 备注: DENCONE GPU Cloud

---

## 步骤 2: 配置 SSL 证书 (推荐)

1. 点击网站右侧的 **证书** 按钮
2. 选择 **Let's Encrypt** 免费证书
3. 点击 **申请**
4. 申请成功后会自动开启 HTTPS

---

## 步骤 3: 配置反向代理

### 方法 A: 使用 1Panel 可视化界面

1. 点击网站右侧的 **设置** 按钮
2. 进入 **反向代理** 
3. 点击 **添加反向代理**
4. 填写:
   - 代理名称: `API`
   - 域名: `www.dencone.com`
   - 协议: `http`
   - 地址: `127.0.0.1`
   - 端口: `3001`
   - 启用: ✅

5. 再添加一个:
   - 代理名称: `前端`
   - 域名: `www.dencone.com`
   - 协议: `http`
   - 地址: `127.0.0.1`  
   - 端口: `3000`
   - 启用: ✅

### 方法 B: 手动配置 (更推荐)

1. 点击网站右侧的 **设置** 按钮
2. 进入 **配置文件**
3. 用以下配置替换:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name www.dencone.com dencone.com;
    
    # 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.dencone.com dencone.com;
    
    # SSL 证书 (1Panel 自动配置)
    ssl_certificate /etc/letsencrypt/live/www.dencone.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www.dencone.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    
    # 前端静态文件
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
        
        # 前端构建输出目录
        root /opt/dencone-gpu/frontend/out;
        try_files $uri $uri/ /index.html;
    }
    
    # API 反向代理
    location /api/ {
        proxy_pass http://127.0.0.1:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # WebSocket 支持 (如果需要)
    location /ws {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

---

## 步骤 4: 验证

1. 访问 `https://www.dencone.com` - 应该能看到网站
2. 访问 `https://www.dencone.com/api/health` - 应该返回 JSON

---

## 常见问题

### 1. 静态文件 404

确保前端已构建:
```bash
cd /opt/dencone-gpu/frontend
npm run build
```

### 2. API 502 错误

检查后端是否运行:
```bash
pm2 status
curl http://localhost:3001/api/health
```

### 3. 证书申请失败

确保域名已正确解析:
```bash
ping www.dencone.com
```

---

需要我帮你检查其他问题吗？
