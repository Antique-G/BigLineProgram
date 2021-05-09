import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePreTravelDetailComponent } from './store-pre-travel-detail.component';

describe('StorePreTravelDetailComponent', () => {
  let component: StorePreTravelDetailComponent;
  let fixture: ComponentFixture<StorePreTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePreTravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePreTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
