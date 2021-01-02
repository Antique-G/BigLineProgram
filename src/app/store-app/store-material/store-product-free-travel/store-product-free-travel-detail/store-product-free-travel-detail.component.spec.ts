import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductFreeTravelDetailComponent } from './store-product-free-travel-detail.component';

describe('StoreProductFreeTravelDetailComponent', () => {
  let component: StoreProductFreeTravelDetailComponent;
  let fixture: ComponentFixture<StoreProductFreeTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductFreeTravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductFreeTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
