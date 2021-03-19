import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommissionListComponent } from './user-commission-list.component';

describe('UserCommissionListComponent', () => {
  let component: UserCommissionListComponent;
  let fixture: ComponentFixture<UserCommissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
