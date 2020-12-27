import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductCreateBystepComponent } from './store-product-create-bystep.component';

describe('StoreProductCreateBystepComponent', () => {
  let component: StoreProductCreateBystepComponent;
  let fixture: ComponentFixture<StoreProductCreateBystepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductCreateBystepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductCreateBystepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
