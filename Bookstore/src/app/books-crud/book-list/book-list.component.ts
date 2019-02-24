import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Book } from 'models/TS/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy, DoCheck {
  originalBooks: Book[] = [];
  itHasDone: boolean = false;

  books$: Observable<Book[]>;
  booksSubscription: Subscription;
  books: Book[] = [];
  
  selectedCategoryFilter$: BehaviorSubject<string> = new BehaviorSubject('Válasszon');
  selectedCategoryNameSubscription: Subscription;
  selectedCategoryName: string;

  selectedYearFilter$: BehaviorSubject<number> = new BehaviorSubject(null);
  selectedYearSubscription: Subscription;
  selectedYear: number;

  searchTextInAuthorAndTitle$: BehaviorSubject<string> = new BehaviorSubject('');
  searchTextInAuthorAndTitleSubscription: Subscription;
  searchTextInAuthorAndTitle: string;

  constructor(private http: HttpClient) {
    this.books$ = this.getAllBooks();
  }

  ngOnInit() {
    this.booksSubscription = this.books$
      .subscribe(result => result
        .sort((a, b) => {return a.id - b.id;})
          .forEach(element => { this.books.push(element)})
      );

    this.selectedCategoryNameSubscription = this.selectedCategoryFilter$
      .subscribe(result => this.selectedCategoryName = result);

    this.selectedYearSubscription = this.selectedYearFilter$
      .subscribe(result => this.selectedYear = result);

    this.searchTextInAuthorAndTitleSubscription = this.searchTextInAuthorAndTitle$
      .subscribe(result => this.searchTextInAuthorAndTitle = result);
  }
  ngDoCheck() {
    if (!this.itHasDone && this.books.length !== 0) {
      this.originalBooks = this.books.slice();
      this.itHasDone = true;
    }

    this.books = [];
    this.originalBooks.forEach((bookMapping: Book) => {
      if (this.selectedCategoryName !== 'Válasszon' && bookMapping.category === this.selectedCategoryName) {
        this.books.push(bookMapping);
      } else if (this.selectedCategoryName === 'Válasszon') {
        this.books.push(bookMapping);
      }
    });

    let tempBooks: Book[] = this.books.slice();
    this.books = [];
    tempBooks.forEach((bookMapping: Book) => {
      if (this.selectedYear !== null && bookMapping.published === this.selectedYear) {
        this.books.push(bookMapping);
      } else if (this.selectedYear === null) {
        this.books.push(bookMapping);
      }
    });

    tempBooks = this.books.slice();
    this.books = [];
    tempBooks.forEach((bookMapping: Book) => {
      if (this.searchTextInAuthorAndTitle !== '' &&
          (bookMapping.author.toLowerCase().indexOf(this.searchTextInAuthorAndTitle) !== -1 ||
          bookMapping.title.toLowerCase().indexOf(this.searchTextInAuthorAndTitle) !== -1)) {
        this.books.push(bookMapping);
      } else if (this.searchTextInAuthorAndTitle === '') {
        this.books.push(bookMapping);
      }
    });
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
    this.selectedCategoryNameSubscription.unsubscribe();
    this.selectedYearSubscription.unsubscribe();
    this.searchTextInAuthorAndTitleSubscription.unsubscribe();
  }

  getAllBooks(): Observable<Book[]> {
    let httpResponse = this.http.get<Book[]>('http://localhost:3000/books');

    return httpResponse;
  }

  onSelectedCategoryName(name: string) {
    this.selectedCategoryFilter$.next(name);
  }

  onSelectedYear(year: number) {
    this.selectedYearFilter$.next(year);
  }

  onSearchTextInAuthorAndTitle(filterText: string) {
    this.searchTextInAuthorAndTitle$.next(filterText);
  }
}
