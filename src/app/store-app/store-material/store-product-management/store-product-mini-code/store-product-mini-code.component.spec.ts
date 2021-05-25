import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductMiniCodeComponent } from './store-product-mini-code.component';

describe('StoreProductMiniCodeComponent', () => {
  let component: StoreProductMiniCodeComponent;
  let fixture: ComponentFixture<StoreProductMiniCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductMiniCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductMiniCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
