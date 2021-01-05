import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductManagementEditornoticeComponent } from './admin-product-management-editornotice.component';

describe('AdminProductManagementEditornoticeComponent', () => {
  let component: AdminProductManagementEditornoticeComponent;
  let fixture: ComponentFixture<AdminProductManagementEditornoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductManagementEditornoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductManagementEditornoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
