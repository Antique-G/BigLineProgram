import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductManagementDetailDescComponent } from './store-product-management-detail-desc.component';

describe('StoreProductManagementDetailDescComponent', () => {
  let component: StoreProductManagementDetailDescComponent;
  let fixture: ComponentFixture<StoreProductManagementDetailDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductManagementDetailDescComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductManagementDetailDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
