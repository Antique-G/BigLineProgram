import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelectRefundComponent } from './admin-select-refund.component';

describe('AdminSelectRefundComponent', () => {
  let component: AdminSelectRefundComponent;
  let fixture: ComponentFixture<AdminSelectRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSelectRefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSelectRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
