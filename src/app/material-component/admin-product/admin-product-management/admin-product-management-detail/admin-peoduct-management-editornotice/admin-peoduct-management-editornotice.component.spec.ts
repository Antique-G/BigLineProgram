import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPeoductManagementEditornoticeComponent } from './admin-peoduct-management-editornotice.component';

describe('AdminPeoductManagementEditornoticeComponent', () => {
  let component: AdminPeoductManagementEditornoticeComponent;
  let fixture: ComponentFixture<AdminPeoductManagementEditornoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPeoductManagementEditornoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPeoductManagementEditornoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
