import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductManagementDetailComponent } from './admin-product-management-detail.component';

describe('AdminProductManagementDetailComponent', () => {
  let component: AdminProductManagementDetailComponent;
  let fixture: ComponentFixture<AdminProductManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductManagementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
