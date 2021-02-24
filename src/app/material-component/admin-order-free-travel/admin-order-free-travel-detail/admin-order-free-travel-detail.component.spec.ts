import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderFreeTravelDetailComponent } from './admin-order-free-travel-detail.component';

describe('AdminOrderFreeTravelDetailComponent', () => {
  let component: AdminOrderFreeTravelDetailComponent;
  let fixture: ComponentFixture<AdminOrderFreeTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderFreeTravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderFreeTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
