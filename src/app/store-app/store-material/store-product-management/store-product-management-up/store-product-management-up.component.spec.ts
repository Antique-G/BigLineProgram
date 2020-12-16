import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductManagementUpComponent } from './store-product-management-up.component';

describe('StoreProductManagementUpComponent', () => {
  let component: StoreProductManagementUpComponent;
  let fixture: ComponentFixture<StoreProductManagementUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductManagementUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductManagementUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
