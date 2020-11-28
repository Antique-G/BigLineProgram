import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreAccountCreateComponent } from './admin-store-account-create.component';

describe('AdminStoreAccountCreateComponent', () => {
  let component: AdminStoreAccountCreateComponent;
  let fixture: ComponentFixture<AdminStoreAccountCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreAccountCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreAccountCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
