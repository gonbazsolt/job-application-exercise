import { Component, OnInit, Input, DoCheck, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../../../models/TS/book';

@Component({
  selector: 'app-book-identifier',
  templateUrl: './book-identifier.component.html',
  styleUrls: ['./book-identifier.component.css']
})

@Injectable()
export class BookIdentifierComponent implements OnInit, DoCheck {
  @Input() func: string;
  books: Book[] = [];
  tableHeadLabel: string;
  buttonLabel: string;
  allTransaction = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.func = params.func);

    this.http.get<any>('http://localhost:8080/books/listall').subscribe((result) => {
      result.books.forEach(element => this.books.push(new Book(element)));
    });

    this.http.get<any>('http://localhost:8080/transactions/listall').subscribe((result) => {
      result.transactions.forEach(element => this.allTransaction.push(element));
    });
  }

  ngDoCheck() {
    if (this.func === 'Mod') {
      this.tableHeadLabel = 'Módosítom';
      this.buttonLabel = 'MÓDOSÍT';
    }
    if (this.func === 'Del') {
      this.tableHeadLabel = 'Törlöm';
      this.buttonLabel = 'TÖRÖL';
    }
  }

  navigateTo(id: number) {
    if (this.func === 'Mod') {
      this.router.navigate(['../modify/', id], { relativeTo: this.route });
    }
    if (this.func === 'Del') {
      this.router.navigate(['../delete/', id], { relativeTo: this.route });
    }
  }

  checkTransactionForBook(id: number): boolean {
    let hasThereBeenTransaction: boolean = false;

    if (this.func === 'Del') {

      this.allTransaction.forEach(element => {
        if (element.book_id === id) {
          hasThereBeenTransaction = true;
        }
      });
    }

    return hasThereBeenTransaction;
  }
}
