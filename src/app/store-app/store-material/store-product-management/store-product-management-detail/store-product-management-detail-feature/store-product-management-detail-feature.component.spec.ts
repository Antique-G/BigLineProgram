import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductManagementDetailFeatureComponent } from './store-product-management-detail-feature.component';

describe('StoreProductManagementDetailFeatureComponent', () => {
  let component: StoreProductManagementDetailFeatureComponent;
  let fixture: ComponentFixture<StoreProductManagementDetailFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductManagementDetailFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductManagementDetailFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
