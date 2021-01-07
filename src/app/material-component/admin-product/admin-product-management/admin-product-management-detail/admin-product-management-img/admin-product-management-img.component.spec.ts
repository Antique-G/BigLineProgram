import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductManagementImgComponent } from './admin-product-management-img.component';

describe('AdminProductManagementImgComponent', () => {
  let component: AdminProductManagementImgComponent;
  let fixture: ComponentFixture<AdminProductManagementImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductManagementImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductManagementImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
