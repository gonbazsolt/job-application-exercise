class Transaction {
  constructor(transaction_object) {
    if (transaction_object.id) {
      this.id = transaction_object.id;
    } else {
      this.id = null;
    }
    this.book_id = transaction_object.book_id;
    this.date = transaction_object.date;
    this.mov_type = transaction_object.mov_type;
    this.qty = transaction_object.qty;
  }
}

module.exports = Transaction;