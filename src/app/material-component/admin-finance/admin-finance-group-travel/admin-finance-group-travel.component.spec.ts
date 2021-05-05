import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceGroupTravelComponent } from './admin-finance-group-travel.component';

describe('AdminFinanceGroupTravelComponent', () => {
  let component: AdminFinanceGroupTravelComponent;
  let fixture: ComponentFixture<AdminFinanceGroupTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceGroupTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceGroupTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
