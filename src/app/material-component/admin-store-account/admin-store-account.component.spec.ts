import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreAccountComponent } from './admin-store-account.component';

describe('AdminStoreAccountComponent', () => {
  let component: AdminStoreAccountComponent;
  let fixture: ComponentFixture<AdminStoreAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
