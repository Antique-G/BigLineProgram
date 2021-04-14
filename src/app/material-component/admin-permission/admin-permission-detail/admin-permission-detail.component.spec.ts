import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionDetailComponent } from './admin-permission-detail.component';

describe('AdminPermissionDetailComponent', () => {
  let component: AdminPermissionDetailComponent;
  let fixture: ComponentFixture<AdminPermissionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPermissionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPermissionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
