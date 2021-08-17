import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseGoodsGalleryComponent } from './choose-goods-gallery.component';

describe('ChooseGoodsGalleryComponent', () => {
  let component: ChooseGoodsGalleryComponent;
  let fixture: ComponentFixture<ChooseGoodsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseGoodsGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseGoodsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
