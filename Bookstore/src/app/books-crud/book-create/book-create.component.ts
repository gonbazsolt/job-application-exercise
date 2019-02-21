import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from '../../../../models/TS/book'

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})

@Injectable()
export class BookCreateComponent implements OnInit {
  createBookForm: FormGroup;
  categories: string[] = ['Novella', 'Regény', 'Dráma', 'Verseskötet', 'Életrajz', 'Képregény'];
  formStatus: string;
  isSubmitPushed: boolean = false;
  notValidPublishingYear: boolean = true;
  succesMessage: boolean = false;

  constructor(private http: HttpClient) { }

  //ez volt az első HttpService amit megírtam, a megfelelő működés szondázása miatt van tele console.log-gal
  //ebben az egyben benne hagyom őket, hogy jól látható legyen a pontos működés és állapotok

  ngOnInit() {
    this.createBookForm = new FormGroup({
      'author': new FormControl(null, Validators.required),
      'title': new FormControl(null, Validators.required),
      'category': new FormControl(null, Validators.required),
      'published': new FormControl(null, [Validators.required, (this.isValidPublishingYear.bind(this))]),
      'description': new FormControl(null)
    });

    this.createBookForm.setValue({
      'author': null,
      'title': null,
      'category': null,
      'published': null,
      'description': null
    });

    this.createBookForm.statusChanges.subscribe(
      (status) => {
        console.log('onChange: formStatus:', status);
        this.formStatus = status;
      })
  }

  onSubmit() {
    this.isSubmitPushed = true;
    console.log('onSubmit', this.formStatus);
    console.log('onSubmit', this.createBookForm.value);

    if (this.formStatus === "VALID") {
      this.sendCreateNewBookHttpRequest(this.createBookForm.value)
        .subscribe(
          result => console.log('onHttpResponse', result),
          (error) => {
            alert(`Az adatbázisba írás sikertelen volt: ${error.error.message ? error.error.message : error.message}`);
            console.log('onHttpRequestError', error)
          });
      this.createBookForm.reset();
      this.isSubmitPushed = false;
      
      this.succesMessage = true;
      setTimeout(() => {
        this.succesMessage = false;
      }, 1500);
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

  sendCreateNewBookHttpRequest(book: Book): Observable<Book> {
    //book.published = null; //direkt hiba generálása az error handling teszteléséhez
    console.log('onHttpRequest', JSON.stringify(book));
    let headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<any>('http://localhost:8080/books/create', book, {headers: headers});
  }
}