import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderPreFreeTravelDetailComponent } from './admin-order-pre-free-travel-detail.component';

describe('AdminOrderPreFreeTravelDetailComponent', () => {
  let component: AdminOrderPreFreeTravelDetailComponent;
  let fixture: ComponentFixture<AdminOrderPreFreeTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderPreFreeTravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderPreFreeTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
