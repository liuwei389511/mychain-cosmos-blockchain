// server/blockchain/block.js - 区块类
const CryptoUtils = require('../utils/crypto');

class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.merkleRoot = CryptoUtils.merkleRoot(transactions);
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return CryptoUtils.calculateHash({
      previousHash: this.previousHash,
      timestamp: this.timestamp,
      merkleRoot: this.merkleRoot,
      nonce: this.nonce
    });
  }

  mineBlock(difficulty) {
    const target = Array(difficulty + 1).join('0');
    
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`区块挖矿成功: ${this.hash}`);
  }

  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }
    return true;
  }

  toJSON() {
    return {
      previousHash: this.previousHash,
      timestamp: this.timestamp,
      transactions: this.transactions.map(tx => tx.toJSON()),
      merkleRoot: this.merkleRoot,
      nonce: this.nonce,
      hash: this.hash
    };
  }
}

module.exports = Block;