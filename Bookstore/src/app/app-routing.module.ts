import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksCrudComponent } from './books-crud/books-crud.component';
import { BookStockManagerComponent } from './book-stock-manager/book-stock-manager.component';
import { OpenPageComponent } from './open-page/open-page.component';

const routes: Routes = [
  {path: '', component: OpenPageComponent},
  {path: 'books', component: BooksCrudComponent},
  {path: 'manager', component: BookStockManagerComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }