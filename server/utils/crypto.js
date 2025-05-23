// server/utils/crypto.js - 加密工具
const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class CryptoUtils {
  static generateKeyPair() {
    const key = ec.genKeyPair();
    return {
      privateKey: key.getPrivate('hex'),
      publicKey: key.getPublic('hex')
    };
  }

  static signTransaction(privateKey, transactionHash) {
    const key = ec.keyFromPrivate(privateKey);
    const signature = key.sign(transactionHash);
    return signature.toDER('hex');
  }

  static verifySignature(publicKey, signature, transactionHash) {
    try {
      const key = ec.keyFromPublic(publicKey, 'hex');
      return key.verify(transactionHash, signature);
    } catch (error) {
      return false;
    }
  }

  static calculateHash(data) {
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
  }

  static merkleRoot(transactions) {
    if (transactions.length === 0) return '';
    if (transactions.length === 1) return this.calculateHash(transactions[0]);
    
    const hashes = transactions.map(tx => this.calculateHash(tx));
    return this.buildMerkleTree(hashes);
  }

  static buildMerkleTree(hashes) {
    if (hashes.length === 1) return hashes[0];
    
    const newLevel = [];
    for (let i = 0; i < hashes.length; i += 2) {
      const left = hashes[i];
      const right = hashes[i + 1] || hashes[i];
      newLevel.push(this.calculateHash(left + right));
    }
    
    return this.buildMerkleTree(newLevel);
  }
}

module.exports = CryptoUtils;