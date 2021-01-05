import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductManagementDetailInfoComponent } from './store-product-management-detail-info.component';

describe('StoreProductManagementDetailInfoComponent', () => {
  let component: StoreProductManagementDetailInfoComponent;
  let fixture: ComponentFixture<StoreProductManagementDetailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductManagementDetailInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductManagementDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
