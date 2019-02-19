import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooksCrudComponent } from './books-crud/books-crud.component';
import { BookStockManagerComponent } from './book-stock-manager/book-stock-manager.component';

import { AppRoutingModule } from './app-routing.module';
import { OpenPageComponent } from './open-page/open-page.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksCrudComponent,
    BookStockManagerComponent,
    OpenPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
