import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductDetailUploadStrokeComponent } from './store-product-detail-upload-stroke.component';

describe('StoreProductDetailUploadStrokeComponent', () => {
  let component: StoreProductDetailUploadStrokeComponent;
  let fixture: ComponentFixture<StoreProductDetailUploadStrokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductDetailUploadStrokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductDetailUploadStrokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
