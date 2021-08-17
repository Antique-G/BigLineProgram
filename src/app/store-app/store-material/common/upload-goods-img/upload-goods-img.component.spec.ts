import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGoodsImgComponent } from './upload-goods-img.component';

describe('UploadGoodsImgComponent', () => {
  let component: UploadGoodsImgComponent;
  let fixture: ComponentFixture<UploadGoodsImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadGoodsImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGoodsImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
