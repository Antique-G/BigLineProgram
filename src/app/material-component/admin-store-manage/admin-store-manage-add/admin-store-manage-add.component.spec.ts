import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreManageAddComponent } from './admin-store-manage-add.component';

describe('AdminStoreManageAddComponent', () => {
  let component: AdminStoreManageAddComponent;
  let fixture: ComponentFixture<AdminStoreManageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreManageAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreManageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
