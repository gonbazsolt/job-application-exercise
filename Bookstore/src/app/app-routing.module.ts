import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksCrudComponent } from './books-crud/books-crud.component';
import { BookStockManagerComponent } from './book-stock-manager/book-stock-manager.component';
import { OpenPageComponent } from './open-page/open-page.component';
import { BookCreateComponent } from './books-crud/book-create/book-create.component';
import { BookListComponent } from './books-crud/book-list/book-list.component';
import { BookModifyComponent } from './books-crud/book-modify/book-modify.component';
import { BookDeleteComponent } from './books-crud/book-delete/book-delete.component';
import { TransactionReceiveComponent } from './book-stock-manager/transaction-receive/transaction-receive.component';
import { TransactionSellComponent } from './book-stock-manager/transaction-sell/transaction-sell.component';
import { TransactionListComponent } from './book-stock-manager/transaction-list/transaction-list.component';

const routes: Routes = [
  {path: '', component: OpenPageComponent},
  {path: 'books', component: BooksCrudComponent, children: [
    {path: 'create', component: BookCreateComponent},
    {path: 'list', component: BookListComponent},
    {path: 'modify', component: BookModifyComponent},
    {path: 'delete', component: BookDeleteComponent}
  ]},
  {path: 'manager', component: BookStockManagerComponent, children: [
    {path: 'receive', component: TransactionReceiveComponent},
    {path: 'sell', component: TransactionSellComponent},
    {path: 'transactionList', component: TransactionListComponent}
  ]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }