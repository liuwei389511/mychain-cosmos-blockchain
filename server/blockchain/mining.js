// server/blockchain/mining.js - 挖矿管理
class MiningManager {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.isMining = false;
    this.miners = new Map();
  }

  startMining(minerAddress) {
    if (this.isMining) {
      throw new Error('已有矿工在挖矿中');
    }

    this.isMining = true;
    
    setTimeout(() => {
      try {
        const block = this.blockchain.minePendingTransactions(minerAddress);
        this.isMining = false;
        
        // 更新矿工统计
        if (!this.miners.has(minerAddress)) {
          this.miners.set(minerAddress, { blocks: 0, totalReward: 0 });
        }
        
        const minerStats = this.miners.get(minerAddress);
        minerStats.blocks++;
        minerStats.totalReward += this.blockchain.miningReward;
        
        return block;
      } catch (error) {
        this.isMining = false;
        throw error;
      }
    }, Math.random() * 5000 + 2000); // 2-7秒随机挖矿时间
  }

  getMinerStats(address) {
    return this.miners.get(address) || { blocks: 0, totalReward: 0 };
  }

  getAllMiners() {
    return Array.from(this.miners.entries()).map(([address, stats]) => ({
      address,
      ...stats
    }));
  }
}

module.exports = MiningManager;