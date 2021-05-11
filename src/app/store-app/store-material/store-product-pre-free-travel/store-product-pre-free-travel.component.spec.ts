import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductPreFreeTravelComponent } from './store-product-pre-free-travel.component';

describe('StoreProductPreFreeTravelComponent', () => {
  let component: StoreProductPreFreeTravelComponent;
  let fixture: ComponentFixture<StoreProductPreFreeTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductPreFreeTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductPreFreeTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
