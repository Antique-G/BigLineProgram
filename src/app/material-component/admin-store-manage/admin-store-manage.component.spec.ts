import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreManageComponent } from './admin-store-manage.component';

describe('AdminStoreManageComponent', () => {
  let component: AdminStoreManageComponent;
  let fixture: ComponentFixture<AdminStoreManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
