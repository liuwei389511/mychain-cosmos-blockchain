/** @format */

// server/routes/blockchain.js - 区块链相关路由
const Router = require("koa-router");
const router = new Router();

// 获取整个区块链
router.get("/", async (ctx) => {
  try {
    const blockchain = ctx.blockchain;
    ctx.body = {
      success: true,
      data: {
        chain: blockchain.chain.map((block) => block.toJSON()),
        stats: blockchain.getStats(),
      },
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
});

// 获取最新区块
router.get("/latest", async (ctx) => {
  try {
    const blockchain = ctx.blockchain;
    const latestBlock = blockchain.getLatestBlock();
    ctx.body = {
      success: true,
      data: latestBlock.toJSON(),
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
});

// 获取特定区块
router.get("/block/:index", async (ctx) => {
  try {
    const blockchain = ctx.blockchain;
    const index = parseInt(ctx.params.index);

    if (index < 0 || index >= blockchain.chain.length) {
      ctx.status = 404;
      ctx.body = {
        success: false,
        error: "区块不存在",
      };
      return;
    }

    ctx.body = {
      success: true,
      data: blockchain.chain[index].toJSON(),
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
});

// 获取待处理交易
router.get("/pending", async (ctx) => {
  try {
    const blockchain = ctx.blockchain;
    ctx.body = {
      success: true,
      data: blockchain.pendingTransactions.map((tx) => tx.toJSON()),
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
});

// 验证区块链
router.get("/validate", async (ctx) => {
  try {
    const blockchain = ctx.blockchain;
    const isValid = blockchain.isChainValid();
    ctx.body = {
      success: true,
      data: {
        isValid,
        message: isValid ? "区块链有效" : "区块链无效",
      },
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
});

// 获取区块链统计信息
router.get("/stats", async (ctx) => {
  try {
    const blockchain = ctx.blockchain;
    ctx.body = {
      success: true,
      data: blockchain.getStats(),
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
});

module.exports = router;
