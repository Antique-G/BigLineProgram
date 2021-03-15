import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductDetailUploadStrokeCreateComponent } from './store-product-detail-upload-stroke-create.component';

describe('StoreProductDetailUploadStrokeCreateComponent', () => {
  let component: StoreProductDetailUploadStrokeCreateComponent;
  let fixture: ComponentFixture<StoreProductDetailUploadStrokeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductDetailUploadStrokeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductDetailUploadStrokeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
