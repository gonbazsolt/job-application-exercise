import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStockManagerComponent } from './book-stock-manager.component';

describe('BookStockManagerComponent', () => {
  let component: BookStockManagerComponent;
  let fixture: ComponentFixture<BookStockManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookStockManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookStockManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
