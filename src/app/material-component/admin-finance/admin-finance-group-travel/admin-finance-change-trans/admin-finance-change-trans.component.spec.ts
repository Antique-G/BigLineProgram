import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceChangeTransComponent } from './admin-finance-change-trans.component';

describe('AdminFinanceChangeTransComponent', () => {
  let component: AdminFinanceChangeTransComponent;
  let fixture: ComponentFixture<AdminFinanceChangeTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceChangeTransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceChangeTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
