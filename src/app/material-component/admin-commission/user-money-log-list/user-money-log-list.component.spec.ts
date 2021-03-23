import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMoneyLogListComponent } from './user-money-log-list.component';

describe('UserMoneyLogListComponent', () => {
  let component: UserMoneyLogListComponent;
  let fixture: ComponentFixture<UserMoneyLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMoneyLogListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMoneyLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
