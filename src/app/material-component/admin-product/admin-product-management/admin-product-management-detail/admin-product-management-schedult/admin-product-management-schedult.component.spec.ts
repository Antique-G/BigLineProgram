import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductManagementSchedultComponent } from './admin-product-management-schedult.component';

describe('AdminProductManagementSchedultComponent', () => {
  let component: AdminProductManagementSchedultComponent;
  let fixture: ComponentFixture<AdminProductManagementSchedultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductManagementSchedultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductManagementSchedultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
