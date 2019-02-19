import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookModifyComponent } from './book-modify.component';

describe('BookModifyComponent', () => {
  let component: BookModifyComponent;
  let fixture: ComponentFixture<BookModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
