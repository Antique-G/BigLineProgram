import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleCreateComponent } from './admin-role-create.component';

describe('AdminRoleCreateComponent', () => {
  let component: AdminRoleCreateComponent;
  let fixture: ComponentFixture<AdminRoleCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRoleCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
