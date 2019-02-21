class Book {
  constructor(book_object) {
    if (book_object.id) {
      this.id = book_object.id;
    } else {
      this.id = null;
    }
    this.book_id = book_object.book_id;
    this.date = book_object.date;
    this.mov_type = book_object.mov_type;
    this.qty = book_object.qty;
  }
}

module.exports = Book;