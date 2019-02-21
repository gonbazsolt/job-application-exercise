import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Book } from '../../../../models/TS/book'
import { currentId } from 'async_hooks';

@Component({
  selector: 'app-book-modify',
  templateUrl: './book-modify.component.html',
  styleUrls: ['./book-modify.component.css']
})

@Injectable()
export class BookModifyComponent implements OnInit {
  currentBook_id: number;
  currentBook: Book;

  modifyBookForm: FormGroup;
  categories: string[] = ['Novella', 'Regény', 'Dráma', 'Verseskötet', 'Életrajz', 'Képregény'];
  formStatus: string = 'VALID';
  isSubmitPushed: boolean = false;
  notValidPublishingYear: boolean = true;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.currentBook_id = this.route.snapshot.params.id;

    this.http.get<any>(`http://localhost:8080/books/getonebook/${this.currentBook_id}`).toPromise();
  }

  async ngOnInit() {
    this.modifyBookForm = new FormGroup({
      'author': new FormControl(null, Validators.required),
      'title': new FormControl(null, Validators.required),
      'category': new FormControl(null, Validators.required),
      'published': new FormControl(null, [Validators.required, (this.isValidPublishingYear.bind(this))]),
      'description': new FormControl(null)
    });

    this.currentBook = await this.getCurrentBook();

    this.modifyBookForm.setValue({
      'author': this.currentBook.author,
      'title': this.currentBook.title,
      'category': this.currentBook.category,
      'published': this.currentBook.published,
      'description': this.currentBook.description
    });

    this.modifyBookForm.statusChanges.subscribe(
      status => this.formStatus = status
    )
  }

  onSubmit() {
    this.isSubmitPushed = true;

    if (this.formStatus === "VALID") {
      let modifiedBook: Book = new Book(this.modifyBookForm.value);
      modifiedBook.id = this.currentBook_id;

      this.sendModifyBookHttpRequest(modifiedBook)
        .subscribe(
          result => console.log('onHttpResponse', result),
          error => alert(`Az adatbázisba írás sikertelen volt: ${error.error.message ? error.error.message : error.message}`)
        );
      this.modifyBookForm.reset();
      this.isSubmitPushed = false;
    }
  }

  isValidPublishingYear(control: FormControl): { [s: string]: boolean } {
    if (control.value > 2019 || control.value < 1901) {
      this.notValidPublishingYear = true;
      return { 'yearIsForbidden': true };
    }
    this.notValidPublishingYear = false;
    return null;
  }

  sendModifyBookHttpRequest(book: Book): Observable<Book> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.put<any>('http://localhost:8080/books/modify', book, { headers: headers });
  }

  async getCurrentBook(): Promise<Book> {
    const httpResponse = await this.http.get<any>(`http://localhost:8080/books/getonebook/${this.currentBook_id}`).toPromise();

    return httpResponse.book;
  }
}