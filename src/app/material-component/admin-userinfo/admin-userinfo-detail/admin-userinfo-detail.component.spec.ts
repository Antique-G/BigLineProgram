import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserinfoDetailComponent } from './admin-userinfo-detail.component';

describe('AdminUserinfoDetailComponent', () => {
  let component: AdminUserinfoDetailComponent;
  let fixture: ComponentFixture<AdminUserinfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserinfoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserinfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
