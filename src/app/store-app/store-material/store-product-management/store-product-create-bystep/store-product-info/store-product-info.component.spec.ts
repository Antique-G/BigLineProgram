import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductInfoComponent } from './store-product-info.component';

describe('StoreProductInfoComponent', () => {
  let component: StoreProductInfoComponent;
  let fixture: ComponentFixture<StoreProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
