import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderGroupAddMembersComponent } from './admin-order-group-add-members.component';

describe('AdminOrderGroupAddMembersComponent', () => {
  let component: AdminOrderGroupAddMembersComponent;
  let fixture: ComponentFixture<AdminOrderGroupAddMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderGroupAddMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderGroupAddMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
