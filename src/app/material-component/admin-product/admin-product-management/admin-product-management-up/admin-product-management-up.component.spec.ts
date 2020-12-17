import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductManagementUpComponent } from './admin-product-management-up.component';

describe('AdminProductManagementUpComponent', () => {
  let component: AdminProductManagementUpComponent;
  let fixture: ComponentFixture<AdminProductManagementUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductManagementUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductManagementUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
