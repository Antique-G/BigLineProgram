import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductUploadStrokeComponent } from './store-product-upload-stroke.component';

describe('StoreProductUploadStrokeComponent', () => {
  let component: StoreProductUploadStrokeComponent;
  let fixture: ComponentFixture<StoreProductUploadStrokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductUploadStrokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductUploadStrokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
