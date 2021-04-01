import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSetNewPasswordComponent } from './store-set-new-password.component';

describe('StoreSetNewPasswordComponent', () => {
  let component: StoreSetNewPasswordComponent;
  let fixture: ComponentFixture<StoreSetNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreSetNewPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSetNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
