import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductManagementPostComponent } from './admin-product-management-post.component';

describe('AdminProductManagementPostComponent', () => {
  let component: AdminProductManagementPostComponent;
  let fixture: ComponentFixture<AdminProductManagementPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductManagementPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductManagementPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
