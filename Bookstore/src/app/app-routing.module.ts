import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksCrudComponent } from './books-crud/books-crud.component';
import { BookStockManagerComponent } from './book-stock-manager/book-stock-manager.component';
import { OpenPageComponent } from './open-page/open-page.component';
import { BookCreateComponent } from './books-crud/book-create/book-create.component';
import { BookListComponent } from './books-crud/book-list/book-list.component';
import { BookModifyComponent } from './books-crud/book-modify/book-modify.component';
import { BookDeleteComponent } from './books-crud/book-delete/book-delete.component';
import { TransactionReceiveOrSellComponent } from './book-stock-manager/transaction-receive-or-sell/transaction-receive-or-sell.component';
import { TransactionListComponent } from './book-stock-manager/transaction-list/transaction-list.component';
import { EmptyPageComponent } from './empty-page/empty-page.component';
import { BookIdentifierComponent } from './books-crud/book-identifier/book-identifier.component';

const routes: Routes = [
  {path: '', component: OpenPageComponent},
  {path: 'books', component: BooksCrudComponent, children: [
    {path: '', component: EmptyPageComponent},
    {path: 'choose', component: BookIdentifierComponent},
    {path: 'create', component: BookCreateComponent},
    {path: 'list', component: BookListComponent},
    {path: 'modify/:id', component: BookModifyComponent},
    {path: 'delete/:id', component: BookDeleteComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
  ]},
  {path: 'manager', component: BookStockManagerComponent, children: [
    {path: '', component: EmptyPageComponent},
    {path: 'receive_or_sell', component: TransactionReceiveOrSellComponent},
    {path: 'transactionList', component: TransactionListComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
  ]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }