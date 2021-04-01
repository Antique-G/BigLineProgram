import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreForgetPasswordComponent } from './store-forget-password.component';

describe('StoreForgetPasswordComponent', () => {
  let component: StoreForgetPasswordComponent;
  let fixture: ComponentFixture<StoreForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreForgetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
