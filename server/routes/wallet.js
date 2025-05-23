/** @format */

// server/routes/wallet.js - 钱包相关路由
const Router = require("koa-router");
const Wallet = require("../blockchain/wallet");
const Transaction = require("../blockchain/transaction");

const router = new Router();

// 创建新钱包
router.post("/create", async (ctx) => {
  try {
    const wallet = new Wallet();
    ctx.body = {
      success: true,
      data: wallet.toJSON(),
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
});

// 从私钥恢复钱包
router.post("/recover", async (ctx) => {
  try {
    const { privateKey } = ctx.request.body;

    if (!privateKey) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: "私钥不能为空",
      };
      return;
    }

    const wallet = Wallet.fromPrivateKey(privateKey);
    ctx.body = {
      success: true,
      data: wallet.toJSON(),
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
});

// 获取钱包余额
router.get("/balance/:address", async (ctx) => {
  try {
    const blockchain = ctx.blockchain;
    const address = ctx.params.address;
    const balance = blockchain.getBalance(address);

    ctx.body = {
      success: true,
      data: {
        address,
        balance,
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

// 发送交易
router.post("/send", async (ctx) => {
  try {
    const { fromAddress, toAddress, amount, fee, privateKey } =
      ctx.request.body;

    if (!fromAddress || !toAddress || !amount || !privateKey) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: "缺少必要参数",
      };
      return;
    }

    const blockchain = ctx.blockchain;
    const wallet = Wallet.fromPrivateKey(privateKey);

    if (wallet.address !== fromAddress) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: "私钥与发送地址不匹配",
      };
      return;
    }

    const transaction = wallet.sendMoney(
      parseFloat(amount),
      toAddress,
      blockchain,
      parseFloat(fee) || 1
    );

    ctx.body = {
      success: true,
      data: transaction.toJSON(),
      message: "交易已提交到待处理队列",
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error.message,
    };
  }
});

// 获取钱包交易历史
router.get("/transactions/:address", async (ctx) => {
  try {
    const blockchain = ctx.blockchain;
    const address = ctx.params.address;
    const transactions = blockchain.getAllTransactionsForWallet(address);

    ctx.body = {
      success: true,
      data: transactions.map((tx) => tx.toJSON()),
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
