import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreNewPasswordSuccessComponent } from './store-new-password-success.component';

describe('StoreNewPasswordSuccessComponent', () => {
  let component: StoreNewPasswordSuccessComponent;
  let fixture: ComponentFixture<StoreNewPasswordSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreNewPasswordSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreNewPasswordSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
