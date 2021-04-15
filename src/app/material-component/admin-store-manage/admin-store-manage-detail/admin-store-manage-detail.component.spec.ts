import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreManageDetailComponent } from './admin-store-manage-detail.component';

describe('AdminStoreManageDetailComponent', () => {
  let component: AdminStoreManageDetailComponent;
  let fixture: ComponentFixture<AdminStoreManageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreManageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreManageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
