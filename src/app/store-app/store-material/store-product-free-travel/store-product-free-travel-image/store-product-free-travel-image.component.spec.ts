import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductFreeTravelImageComponent } from './store-product-free-travel-image.component';

describe('StoreProductFreeTravelImageComponent', () => {
  let component: StoreProductFreeTravelImageComponent;
  let fixture: ComponentFixture<StoreProductFreeTravelImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductFreeTravelImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductFreeTravelImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
