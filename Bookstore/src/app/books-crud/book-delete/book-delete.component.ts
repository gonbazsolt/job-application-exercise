import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from 'models/TS/book';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {
  currentBook_id: number;
  currentBook: Book;
  succesMessage: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.currentBook_id = this.route.snapshot.params.id;
  }

  async ngOnInit() {
    this.currentBook = await this.getCurrentBook();
    console.log(this.currentBook);
  }

  async getCurrentBook(): Promise<Book> {
    const httpResponse = await this.http.get<any>(`http://localhost:8080/books/getonebook/${this.currentBook_id}`).toPromise();

    return httpResponse.book;
  }

  delete() {
    this.sendDeleteBookHttpRequest(this.currentBook)
      .subscribe(
        result => console.log('onHttpResponse', result),
        error => alert(`Az adatbázisba írás sikertelen volt: ${error.error.message ? error.error.message : error.message}`)
      );
    this.succesMessage = true;
    setTimeout(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    }, 1500);
  }

  sendDeleteBookHttpRequest(book: Book): Observable<Book> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.delete<any>(`http://localhost:8080/books/delete/${book.id}`, { headers: headers });
  }
}
