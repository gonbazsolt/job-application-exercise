import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionReceiveComponent } from './transaction-receive.component';

describe('TransactionReceiveComponent', () => {
  let component: TransactionReceiveComponent;
  let fixture: ComponentFixture<TransactionReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
