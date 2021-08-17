import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderFreePrintConfirmComponent } from './admin-order-free-print-confirm.component';

describe('AdminOrderFreePrintConfirmComponent', () => {
  let component: AdminOrderFreePrintConfirmComponent;
  let fixture: ComponentFixture<AdminOrderFreePrintConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderFreePrintConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderFreePrintConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
