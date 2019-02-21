export class Transaction {
  id: number;
  book_id: string;
  date: string;
  mov_type: string;
  qty: number;

  constructor(book_object: Transaction) {
    this.id = book_object.id;
    this.book_id = book_object.book_id;
    this.date = book_object.date;
    this.mov_type = book_object.mov_type;
    this.qty = book_object.qty;
  }
}