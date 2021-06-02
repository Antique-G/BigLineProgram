import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePreFreeAppointDetailComponent } from './store-pre-free-appoint-detail.component';

describe('StorePreFreeAppointDetailComponent', () => {
  let component: StorePreFreeAppointDetailComponent;
  let fixture: ComponentFixture<StorePreFreeAppointDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePreFreeAppointDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePreFreeAppointDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
