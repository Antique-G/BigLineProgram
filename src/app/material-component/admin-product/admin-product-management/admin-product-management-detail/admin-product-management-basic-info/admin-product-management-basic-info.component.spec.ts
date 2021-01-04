import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductManagementBasicInfoComponent } from './admin-product-management-basic-info.component';

describe('AdminProductManagementBasicInfoComponent', () => {
  let component: AdminProductManagementBasicInfoComponent;
  let fixture: ComponentFixture<AdminProductManagementBasicInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductManagementBasicInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductManagementBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
