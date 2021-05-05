import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceFreeTravelComponent } from './admin-finance-free-travel.component';

describe('AdminFinanceFreeTravelComponent', () => {
  let component: AdminFinanceFreeTravelComponent;
  let fixture: ComponentFixture<AdminFinanceFreeTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceFreeTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceFreeTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
