export class Book {
  id: number;
  author: string;
  title: string;
  category: string;
  published: number;
  description: string;

  constructor(book_object: Book) {
    this.id = book_object.id;
    this.author = book_object.author;
    this.title = book_object.title;
    this.category = book_object.category;
    this.published = book_object.published;
    this.description = book_object.description;
  }
}