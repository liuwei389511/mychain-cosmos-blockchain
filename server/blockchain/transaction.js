// server/blockchain/transaction.js - 交易类
const CryptoUtils = require('../utils/crypto');

class Transaction {
  constructor(fromAddress, toAddress, amount, fee = 0) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.fee = fee;
    this.timestamp = Date.now();
    this.signature = null;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return CryptoUtils.calculateHash({
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      amount: this.amount,
      fee: this.fee,
      timestamp: this.timestamp
    });
  }

  signTransaction(privateKey) {
    if (this.fromAddress === null) return; // 挖矿奖励交易
    
    const publicKey = require('elliptic').ec('secp256k1')
      .keyFromPrivate(privateKey).getPublic('hex');
    
    if (publicKey !== this.fromAddress) {
      throw new Error('你不能签署其他钱包的交易！');
    }

    this.signature = CryptoUtils.signTransaction(privateKey, this.hash);
  }

  isValid() {
    if (this.fromAddress === null) return true; // 挖矿奖励
    
    if (!this.signature || this.signature.length === 0) {
      throw new Error('此交易未签名');
    }

    return CryptoUtils.verifySignature(this.fromAddress, this.signature, this.hash);
  }

  toJSON() {
    return {
      fromAddress: this.fromAddress,
      toAddress: this.toAddress,
      amount: this.amount,
      fee: this.fee,
      timestamp: this.timestamp,
      signature: this.signature,
      hash: this.hash
    };
  }
}

module.exports = Transaction;