import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductManagementDetailComponent } from './store-product-management-detail.component';

describe('StoreProductManagementDetailComponent', () => {
  let component: StoreProductManagementDetailComponent;
  let fixture: ComponentFixture<StoreProductManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductManagementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
