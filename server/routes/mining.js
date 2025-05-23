/** @format */

// server/routes/mining.js - 挖矿相关路由
const Router = require("koa-router");
const router = new Router();

// 开始挖矿
router.post("/start", async (ctx) => {
  try {
    const { minerAddress } = ctx.request.body;

    if (!minerAddress) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: "矿工地址不能为空",
      };
      return;
    }

    const miningManager = ctx.miningManager;

    if (miningManager.isMining) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: "当前已有矿工在挖矿",
      };
      return;
    }

    // 异步开始挖矿
    miningManager.startMining(minerAddress);

    ctx.body = {
      success: true,
      message: "开始挖矿...",
      data: {
        minerAddress,
        pendingTransactions: ctx.blockchain.pendingTransactions.length,
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

// 获取挖矿状态
router.get("/status", async (ctx) => {
  try {
    const miningManager = ctx.miningManager;
    const blockchain = ctx.blockchain;

    ctx.body = {
      success: true,
      data: {
        isMining: miningManager.isMining,
        pendingTransactions: blockchain.pendingTransactions.length,
        difficulty: blockchain.difficulty,
        miningReward: blockchain.miningReward,
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

// 获取矿工统计
router.get("/miners", async (ctx) => {
  try {
    const miningManager = ctx.miningManager;
    const miners = miningManager.getAllMiners();

    ctx.body = {
      success: true,
      data: miners,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
});

// 获取特定矿工统计
router.get("/miner/:address", async (ctx) => {
  try {
    const miningManager = ctx.miningManager;
    const address = ctx.params.address;
    const stats = miningManager.getMinerStats(address);

    ctx.body = {
      success: true,
      data: {
        address,
        ...stats,
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

module.exports = router;
