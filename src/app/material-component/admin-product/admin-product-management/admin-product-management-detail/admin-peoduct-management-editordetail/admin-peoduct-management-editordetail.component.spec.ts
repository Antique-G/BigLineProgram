import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPeoductManagementEditordetailComponent } from './admin-peoduct-management-editordetail.component';

describe('AdminPeoductManagementEditordetailComponent', () => {
  let component: AdminPeoductManagementEditordetailComponent;
  let fixture: ComponentFixture<AdminPeoductManagementEditordetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPeoductManagementEditordetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPeoductManagementEditordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
