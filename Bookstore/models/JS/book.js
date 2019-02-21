class Book {
  constructor(book_object) {
    if (book_object.id) {
      this.id = book_object.id;
    } else {
      this.id = null;
    }
    this.author = book_object.author;
    this.title = book_object.title;
    this.category = book_object.category;
    this.published = book_object.published;
    this.description = book_object.description;
  }
}

module.exports = Book;