import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductPostComponent } from './store-product-post.component';

describe('StoreProductPostComponent', () => {
  let component: StoreProductPostComponent;
  let fixture: ComponentFixture<StoreProductPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
