import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    BooksCrudComponent,
    BookStockManagerComponent,
    OpenPageComponent,
    BookCreateComponent,
    BookListComponent,
    BookModifyComponent,
    BookDeleteComponent,
    TransactionReceiveComponent,
    TransactionSellComponent,
    TransactionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
