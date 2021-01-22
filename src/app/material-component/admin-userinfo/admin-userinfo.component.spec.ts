import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserinfoComponent } from './admin-userinfo.component';

describe('AdminUserinfoComponent', () => {
  let component: AdminUserinfoComponent;
  let fixture: ComponentFixture<AdminUserinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
