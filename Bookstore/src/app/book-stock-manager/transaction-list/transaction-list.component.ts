import { Transaction } from '../../../../models/TS/transaction';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  //@Input() func: string;
  transactions: Transaction[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://localhost:8080/transactions/listall').subscribe((result) => {
      result.transactions.forEach(element => this.transactions.push(element));
    });
  }
}
