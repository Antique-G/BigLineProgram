import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRequestMoneyComponent } from './store-request-money.component';

describe('StoreRequestMoneyComponent', () => {
  let component: StoreRequestMoneyComponent;
  let fixture: ComponentFixture<StoreRequestMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreRequestMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRequestMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
