import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserinfoEditComponent } from './admin-userinfo-edit.component';

describe('AdminUserinfoEditComponent', () => {
  let component: AdminUserinfoEditComponent;
  let fixture: ComponentFixture<AdminUserinfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserinfoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserinfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
