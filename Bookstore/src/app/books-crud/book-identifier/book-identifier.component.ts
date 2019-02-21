import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../../../models/TS/book';

@Component({
  selector: 'app-book-identifier',
  templateUrl: './book-identifier.component.html',
  styleUrls: ['./book-identifier.component.css']
})

export class BookIdentifierComponent implements OnInit {
  @Input() func: string;
  books: Book[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.func = params.func);

    this.http.get<any>('http://localhost:8080/books/listall').subscribe((result) => {
      result.books.forEach(element => this.books.push(new Book(element)));
    });
  }

  navigateTo(id: number) {
    if (this.func === 'Mod') {
      this.router.navigate(['../modify/', id], { relativeTo: this.route });
    }
    if (this.func === 'Del') {
      this.router.navigate(['../delete/', id], { relativeTo: this.route });
    }
  }
}
