import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceFreeTravelDetailComponent } from './admin-finance-free-travel-detail.component';

describe('AdminFinanceFreeTravelDetailComponent', () => {
  let component: AdminFinanceFreeTravelDetailComponent;
  let fixture: ComponentFixture<AdminFinanceFreeTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceFreeTravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceFreeTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
