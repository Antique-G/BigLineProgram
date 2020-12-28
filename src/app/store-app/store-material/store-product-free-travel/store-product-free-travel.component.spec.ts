import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductFreeTravelComponent } from './store-product-free-travel.component';

describe('StoreProductFreeTravelComponent', () => {
  let component: StoreProductFreeTravelComponent;
  let fixture: ComponentFixture<StoreProductFreeTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductFreeTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductFreeTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
