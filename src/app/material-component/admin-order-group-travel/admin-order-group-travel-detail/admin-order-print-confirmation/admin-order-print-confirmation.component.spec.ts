import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderPrintConfirmationComponent } from './admin-order-print-confirmation.component';

describe('AdminOrderPrintConfirmationComponent', () => {
  let component: AdminOrderPrintConfirmationComponent;
  let fixture: ComponentFixture<AdminOrderPrintConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderPrintConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderPrintConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
