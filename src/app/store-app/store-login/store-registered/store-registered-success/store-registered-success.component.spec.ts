import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRegisteredSuccessComponent } from './store-registered-success.component';

describe('StoreRegisteredSuccessComponent', () => {
  let component: StoreRegisteredSuccessComponent;
  let fixture: ComponentFixture<StoreRegisteredSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreRegisteredSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreRegisteredSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
