import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreBankAccountComponent } from './admin-store-bank-account.component';

describe('AdminStoreBankAccountComponent', () => {
  let component: AdminStoreBankAccountComponent;
  let fixture: ComponentFixture<AdminStoreBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreBankAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
