import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductEditornoticeComponent } from './store-product-editornotice.component';

describe('StoreProductEditornoticeComponent', () => {
  let component: StoreProductEditornoticeComponent;
  let fixture: ComponentFixture<StoreProductEditornoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductEditornoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductEditornoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
