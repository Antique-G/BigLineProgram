import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductEditordetailComponent } from './store-product-editordetail.component';

describe('StoreProductEditordetailComponent', () => {
  let component: StoreProductEditordetailComponent;
  let fixture: ComponentFixture<StoreProductEditordetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductEditordetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductEditordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
