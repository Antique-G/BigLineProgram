import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductManagementComponent } from './store-product-management.component';

describe('StoreProductManagementComponent', () => {
  let component: StoreProductManagementComponent;
  let fixture: ComponentFixture<StoreProductManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
