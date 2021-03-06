import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BooksCrudComponent } from './books-crud/books-crud.component';
import { BookStockManagerComponent } from './book-stock-manager/book-stock-manager.component';
import { OpenPageComponent } from './open-page/open-page.component';
import { EmptyPageComponent } from './empty-page/empty-page.component';

import { BookCreateComponent } from './books-crud/book-create/book-create.component';
import { BookListComponent } from './books-crud/book-list/book-list.component';
import { BookModifyComponent } from './books-crud/book-modify/book-modify.component';
import { BookDeleteComponent } from './books-crud/book-delete/book-delete.component';
import { BookIdentifierComponent } from './books-crud/book-identifier/book-identifier.component';

import { TransactionListComponent } from './book-stock-manager/transaction-list/transaction-list.component';
import { TransactionReceiveOrSellComponent } from './book-stock-manager/transaction-receive-or-sell/transaction-receive-or-sell.component';
import { BookFilterComponent } from './books-crud/book-list/book-filter/book-filter.component';
import { BookTableComponent } from './books-crud/book-list/book-table/book-table.component';

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
    TransactionReceiveOrSellComponent,
    TransactionListComponent,
    BookIdentifierComponent,
    EmptyPageComponent,
    BookFilterComponent,
    BookTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
