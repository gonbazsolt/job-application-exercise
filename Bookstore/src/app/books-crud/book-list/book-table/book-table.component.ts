import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'models/TS/book';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent implements OnInit {
  @Input() books: Book[];

  constructor() { }

  ngOnInit() { }
}
