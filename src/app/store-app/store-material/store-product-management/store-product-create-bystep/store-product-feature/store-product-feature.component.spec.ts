import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductFeatureComponent } from './store-product-feature.component';

describe('StoreProductFeatureComponent', () => {
  let component: StoreProductFeatureComponent;
  let fixture: ComponentFixture<StoreProductFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
