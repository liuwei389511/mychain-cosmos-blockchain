// server/app.js - Koa2 主服务器
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const cors = require('@koa/cors');
const path = require('path');

const Blockchain = require('./blockchain/blockchain');
const Wallet = require('./blockchain/wallet');
const MiningManager = require('./blockchain/mining');

// 路由
const blockchainRoutes = require('./routes/blockchain');
const walletRoutes = require('./routes/wallet');
const miningRoutes = require('./routes/mining');

// 创建应用实例
const app = new Koa();
const router = new Router();

// 创建区块链实例
const myChain = new Blockchain();
const miningManager = new MiningManager(myChain);

// 中间件
app.use(cors());
app.use(bodyParser());
app.use(serve(path.join(__dirname, '../public')));

// 将区块链实例注入到上下文
app.use(async (ctx, next) => {
  ctx.blockchain = myChain;
  ctx.miningManager = miningManager;
  await next();
});

// 健康检查
router.get('/api/health', async (ctx) => {
  ctx.body = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  };
});

// 注册路由
router.use('/api/blockchain', blockchainRoutes.routes());
router.use('/api/wallet', walletRoutes.routes());
router.use('/api/mining', miningRoutes.routes());

app.use(router.routes());
app.use(router.allowedMethods());

// 错误处理
app.on('error', (err, ctx) => {
  console.error('服务器错误:', err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 MyChain服务器运行在 http://localhost:${PORT}`);
  console.log(`📊 区块链API地址: http://localhost:${PORT}/api`);
  console.log(`🌐 前端界面: http://localhost:${PORT}`);
});

module.exports = app;