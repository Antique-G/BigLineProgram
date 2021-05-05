import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceGroupTravelDetailComponent } from './admin-finance-group-travel-detail.component';

describe('AdminFinanceGroupTravelDetailComponent', () => {
  let component: AdminFinanceGroupTravelDetailComponent;
  let fixture: ComponentFixture<AdminFinanceGroupTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceGroupTravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceGroupTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
