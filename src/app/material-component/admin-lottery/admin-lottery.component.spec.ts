import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLotteryComponent } from './admin-lottery.component';

describe('AdminLotteryComponent', () => {
  let component: AdminLotteryComponent;
  let fixture: ComponentFixture<AdminLotteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLotteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
