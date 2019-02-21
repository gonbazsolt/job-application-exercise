import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookIdentifierComponent } from './book-identifier.component';

describe('BookIdentifierComponent', () => {
  let component: BookIdentifierComponent;
  let fixture: ComponentFixture<BookIdentifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookIdentifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
