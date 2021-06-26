import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGoodsVideoComponent } from './upload-goods-video.component';

describe('UploadGoodsVideoComponent', () => {
  let component: UploadGoodsVideoComponent;
  let fixture: ComponentFixture<UploadGoodsVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadGoodsVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGoodsVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
