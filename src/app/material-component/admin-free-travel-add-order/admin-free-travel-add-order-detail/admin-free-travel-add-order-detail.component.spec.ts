import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFreeTravelAddOrderDetailComponent } from './admin-free-travel-add-order-detail.component';

describe('AdminFreeTravelAddOrderDetailComponent', () => {
  let component: AdminFreeTravelAddOrderDetailComponent;
  let fixture: ComponentFixture<AdminFreeTravelAddOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFreeTravelAddOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFreeTravelAddOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
