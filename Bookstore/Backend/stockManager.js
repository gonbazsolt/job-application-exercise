var Stock = require('./../models/JS/stock');
var Transaction = require('./../models/JS/transaction');

class StockManager {
  constructor(db, transaction) {
    this.db = db;
    this.transaction = new Transaction(transaction);
  }

  getCurrentStock() {
    let findObject = { book_id: parseInt(this.transaction.book_id) };
    let dbQuery = this.db.get('stock').find(findObject).value();
    let currentStock = new Stock(dbQuery);

    return currentStock.qty;
  }

  bookingStock(movingDirection) {
    let newStockQty;
    if (movingDirection === 'B') {
      newStockQty = this.getCurrentStock() + this.transaction.qty;
    }
    if (movingDirection === 'E') {
      newStockQty = this.getCurrentStock() - this.transaction.qty;
    }
    let newStock = new Stock(
      {
        book_id: parseInt(this.transaction.book_id),
        qty: newStockQty
      });

    this.db.get('stock').remove({ book_id: newStock.book_id }).write();
    this.db.get('stock').push(newStock).write();
  }

  hasEnoughStock() {
    if (this.getCurrentStock() < this.transaction.qty) return false;
    return true;
  }
}

module.exports = StockManager;