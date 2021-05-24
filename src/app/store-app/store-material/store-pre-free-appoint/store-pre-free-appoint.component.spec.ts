import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePreFreeAppointComponent } from './store-pre-free-appoint.component';

describe('StorePreFreeAppointComponent', () => {
  let component: StorePreFreeAppointComponent;
  let fixture: ComponentFixture<StorePreFreeAppointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePreFreeAppointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePreFreeAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
