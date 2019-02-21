import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Transaction } from '../../../../models/TS/transaction';

@Component({
  selector: 'app-transaction-receive-or-sell',
  templateUrl: './transaction-receive-or-sell.component.html',
  styleUrls: ['./transaction-receive-or-sell.component.css']
})

@Injectable()
export class TransactionReceiveOrSellComponent implements OnInit {
  receiveTransactionForm: FormGroup;
  formStatus: string;
  categories: string[] = ['B', 'E'];
  succesMessage: boolean = false;
  bookIDs: number[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.receiveTransactionForm = new FormGroup({
      'book_id': new FormControl(null, [Validators.required, this.bookIDValidator.bind(this)]),
      'date': new FormControl(null, Validators.required),
      'mov_type': new FormControl(null, [Validators.required, this.movementTypeValidator.bind(this)]),
      'qty': new FormControl(null, Validators.required)
    });

    this.receiveTransactionForm.setValue({
      'book_id': null,
      'date': null,
      'mov_type': null,
      'qty': null
    });

    this.receiveTransactionForm.statusChanges.subscribe(
      (status) => {
        this.formStatus = status;
      })

    this.http.get<any>('http://localhost:8080/books/listall').subscribe((result) => {
      result.books.forEach(element => this.bookIDs.push(element.id));
    });
  }

  movementTypeValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value !== null) {
      if (this.categories.indexOf(control.value.toUpperCase()) === -1) {
        return { 'movementTypeIsForbidden': true };
      }
    }
    return null;
  }

  bookIDValidator(control: FormControl): { [s: string]: boolean } {
    if (this.bookIDs.indexOf(parseInt(control.value)) === -1) {
      return { 'bookIDIsForbidden': true };
    }

    return null;
  }

  onSubmit() {
    console.log(this.formStatus);
    console.log(this.receiveTransactionForm.value);

    if (this.formStatus === "VALID") {
      this.receiveTransactionForm.value.book_id = parseInt(this.receiveTransactionForm.value.book_id);
      this.receiveTransactionForm.value.mov_type = this.receiveTransactionForm.value.mov_type.toUpperCase();
      this.sendCreateNewBookHttpRequest(this.receiveTransactionForm.value)
        .subscribe(
          result => console.log('onHttpResponse', result),
          (error) => {
            alert(`Az adatbázisba írás sikertelen volt: ${error.error.message ? error.error.message : error.message}`);
            console.log('onHttpRequestError', error)
          });
      this.receiveTransactionForm.reset();

      this.succesMessage = true;
      setTimeout(() => {
        this.succesMessage = false;
      }, 1500);
    }
  }

  sendCreateNewBookHttpRequest(transaction: Transaction): Observable<Transaction> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<any>('http://localhost:8080/transactions/receive_or_sell', transaction, { headers: headers });
  }
}
