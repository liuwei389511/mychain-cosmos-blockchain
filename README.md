<!-- @format -->

# MyChain - 基于 Cosmos 思想的区块链项目

一个基于 Cosmos SDK 思想实现的简化版区块链，支持挖矿、转账等基础功能，使用 Koa2 构建 API 服务器，包含完整的前端管理界面。

## 🚀 功能特性

### 核心功能

- ✅ **区块链核心**: 基于工作量证明(PoW)的区块链实现
- ✅ **钱包管理**: 创建钱包、导入钱包、余额查询
- ✅ **交易系统**: 发送/接收交易、交易签名验证
- ✅ **挖矿机制**: 可调难度的挖矿系统
- ✅ **数据完整性**: Merkle 树验证、区块链完整性检查

### API 功能

- 🔗 **区块链 API**: 查询区块、验证链、获取统计信息
- 💰 **钱包 API**: 创建钱包、查询余额、发送交易
- ⛏️ **挖矿 API**: 开始挖矿、查询状态、矿工统计

### 前端界面

- 📱 **响应式设计**: 支持桌面端和移动端
- 🎨 **现代 UI**: 渐变色彩、卡片式布局
- 🔄 **实时更新**: 自动刷新数据、实时状态显示
- 🔍 **区块浏览器**: 搜索区块、查看交易详情

## 📁 项目结构

```
mychain/
├── package.json                 # 项目配置
├── README.md                   # 项目文档
├── .gitignore                  # Git忽略文件
├── server/                     # 后端服务器
│   ├── app.js                 # Koa2主服务器
│   ├── blockchain/            # 区块链核心模块
│   │   ├── block.js          # 区块类
│   │   ├── blockchain.js     # 区块链类
│   │   ├── transaction.js    # 交易类
│   │   ├── wallet.js         # 钱包类
│   │   └── mining.js         # 挖矿管理
│   ├── routes/               # API路由
│   │   ├── blockchain.js     # 区块链路由
│   │   ├── wallet.js         # 钱包路由
│   │   └── mining.js         # 挖矿路由
│   └── utils/                # 工具类
│       └── crypto.js         # 加密工具
├── public/                   # 前端文件
│   └── index.html           # 主页面
├── tests/                   # 测试文件
│   └── blockchain.test.js   # 区块链测试
├── scripts/                 # 脚本文件
│   ├── start.js            # 启动脚本
│   └── monitor.js          # 性能监控
├── docker/                 # Docker配置
│   ├── Dockerfile
│   └── docker-compose.yml
└── .github/workflows/      # GitHub Actions
    └── main.yml
```

## 🛠️ 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 启动生产服务器

```bash
npm start
```

### 访问应用

- 前端界面: http://localhost:3000
- API 文档: http://localhost:3000/api

## 📖 API 文档

### 区块链 API

#### 获取整个区块链

```http
GET /api/blockchain
```

#### 获取最新区块

```http
GET /api/blockchain/latest
```

#### 获取特定区块

```http
GET /api/blockchain/block/:index
```

#### 验证区块链

```http
GET /api/blockchain/validate
```

#### 获取统计信息

```http
GET /api/blockchain/stats
```

### 钱包 API

#### 创建新钱包

```http
POST /api/wallet/create
```

#### 从私钥恢复钱包

```http
POST /api/wallet/recover
Content-Type: application/json

{
  "privateKey": "私钥字符串"
}
```

#### 查询余额

```http
GET /api/wallet/balance/:address
```

#### 发送交易

```http
POST /api/wallet/send
Content-Type: application/json

{
  "fromAddress": "发送方地址",
  "toAddress": "接收方地址",
  "amount": 转账金额,
  "fee": 手续费,
  "privateKey": "发送方私钥"
}
```

#### 获取交易历史

```http
GET /api/wallet/transactions/:address
```

### 挖矿 API

#### 开始挖矿

```http
POST /api/mining/start
Content-Type: application/json

{
  "minerAddress": "矿工地址"
}
```

#### 获取挖矿状态

```http
GET /api/mining/status
```

#### 获取所有矿工统计

```http
GET /api/mining/miners
```

#### 获取特定矿工统计

```http
GET /api/mining/miner/:address
```

## 🔧 配置说明

### 区块链参数

- **挖矿难度**: 默认为 2，可在`blockchain.js`中修改
- **出块时间**: 目标 10 秒，可调整
- **挖矿奖励**: 默认 100 MYC
- **最大交易数**: 每个区块无限制

### 安全配置

- 使用 secp256k1 椭圆曲线加密
- SHA-256 哈希算法
- ECDSA 数字签名
- Merkle 树交易验证

## 🎯 使用教程

### 1. 创建钱包

1. 访问前端界面
2. 点击"钱包"标签
3. 点击"创建新钱包"按钮
4. 妥善保存显示的私钥

### 2. 发送交易

1. 确保钱包有足够余额
2. 填写接收地址和转账金额
3. 设置手续费（默认 1 MYC）
4. 点击"发送交易"

### 3. 开始挖矿

1. 切换到"挖矿"标签
2. 确保有钱包作为矿工地址
3. 点击"开始挖矿"
4. 等待挖矿完成获得奖励

### 4. 区块浏览

1. 切换到"浏览器"标签
2. 查看最新区块信息
3. 输入区块索引进行搜索
4. 查看待处理交易

## 🔒 安全注意事项

1. **私钥保护**: 私钥是资产的唯一凭证，请妥善保管
2. **网络安全**: 生产环境请使用 HTTPS
3. **输入验证**: 所有用户输入都经过验证
4. **错误处理**: 完善的错误处理和用户提示

## 🧪 测试

运行测试套件:

```bash
npm test
```

## 📝 开发指南

### 添加新功能

1. 在相应的模块中添加业务逻辑
2. 在路由中添加 API 端点
3. 在前端添加用户界面
4. 编写测试用例

### 自定义配置

可以通过环境变量自定义配置:

- `PORT`: 服务器端口（默认 3000）
- `DIFFICULTY`: 挖矿难度（默认 2）
- `MINING_REWARD`: 挖矿奖励（默认 100）

## 🤝 贡献指南

1. Fork 这个项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

这个 project 使用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Cosmos SDK](https://docs.cosmos.network/) - 区块链框架灵感来源
- [Koa.js](https://koajs.com/) - 轻量级 Node.js 框架
- [Elliptic](https://github.com/indutny/elliptic) - 椭圆曲线加密库

---

## 📞 联系方式

如有问题或建议，请通过以下方式联系:

- 创建 Issue
- 发送 Pull Request
- 邮箱: your-email@example.com

**享受区块链开发的乐趣！** 🚀
