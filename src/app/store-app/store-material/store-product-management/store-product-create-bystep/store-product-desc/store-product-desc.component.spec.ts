import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductDescComponent } from './store-product-desc.component';

describe('StoreProductDescComponent', () => {
  let component: StoreProductDescComponent;
  let fixture: ComponentFixture<StoreProductDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
