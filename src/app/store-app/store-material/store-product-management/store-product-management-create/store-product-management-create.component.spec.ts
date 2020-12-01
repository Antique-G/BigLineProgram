import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductManagementCreateComponent } from './store-product-management-create.component';

describe('StoreProductManagementCreateComponent', () => {
  let component: StoreProductManagementCreateComponent;
  let fixture: ComponentFixture<StoreProductManagementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductManagementCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
