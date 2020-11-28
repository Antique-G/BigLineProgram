import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreBankAccountCreateComponent } from './admin-store-bank-account-create.component';

describe('AdminStoreBankAccountCreateComponent', () => {
  let component: AdminStoreBankAccountCreateComponent;
  let fixture: ComponentFixture<AdminStoreBankAccountCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreBankAccountCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreBankAccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
