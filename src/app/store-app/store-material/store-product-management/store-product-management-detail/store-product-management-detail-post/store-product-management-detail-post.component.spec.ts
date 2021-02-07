import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductManagementDetailPostComponent } from './store-product-management-detail-post.component';

describe('StoreProductManagementDetailPostComponent', () => {
  let component: StoreProductManagementDetailPostComponent;
  let fixture: ComponentFixture<StoreProductManagementDetailPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductManagementDetailPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductManagementDetailPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
