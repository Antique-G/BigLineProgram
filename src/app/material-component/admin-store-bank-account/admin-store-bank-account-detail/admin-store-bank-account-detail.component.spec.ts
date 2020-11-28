import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreBankAccountDetailComponent } from './admin-store-bank-account-detail.component';

describe('AdminStoreBankAccountDetailComponent', () => {
  let component: AdminStoreBankAccountDetailComponent;
  let fixture: ComponentFixture<AdminStoreBankAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreBankAccountDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreBankAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
