// server/blockchain/wallet.js - 钱包类
const CryptoUtils = require('../utils/crypto');

class Wallet {
  constructor() {
    const keyPair = CryptoUtils.generateKeyPair();
    this.privateKey = keyPair.privateKey;
    this.publicKey = keyPair.publicKey;
    this.address = this.publicKey; // 简化实现，实际中会用地址派生
  }

  static fromPrivateKey(privateKey) {
    const wallet = new Wallet();
    wallet.privateKey = privateKey;
    
    const EC = require('elliptic').ec;
    const ec = new EC('secp256k1');
    const key = ec.keyFromPrivate(privateKey);
    wallet.publicKey = key.getPublic('hex');
    wallet.address = wallet.publicKey;
    
    return wallet;
  }

  getBalance(blockchain) {
    return blockchain.getBalance(this.address);
  }

  sendMoney(amount, payeeAddress, blockchain, fee = 1) {
    const Transaction = require('./transaction');
    
    const transaction = new Transaction(this.address, payeeAddress, amount, fee);
    transaction.signTransaction(this.privateKey);
    
    blockchain.createTransaction(transaction);
    return transaction;
  }

  getTransactionHistory(blockchain) {
    return blockchain.getAllTransactionsForWallet(this.address);
  }

  toJSON() {
    return {
      address: this.address,
      publicKey: this.publicKey,
      // 注意：实际应用中不应该暴露私钥
      privateKey: this.privateKey
    };
  }
}

module.exports = Wallet;