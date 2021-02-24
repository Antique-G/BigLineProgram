import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderGroupTravelDetailComponent } from './admin-order-group-travel-detail.component';

describe('AdminOrderGroupTravelDetailComponent', () => {
  let component: AdminOrderGroupTravelDetailComponent;
  let fixture: ComponentFixture<AdminOrderGroupTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderGroupTravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderGroupTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
