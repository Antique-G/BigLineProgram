import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductManagementOperateLogComponent } from './store-product-management-operate-log.component';

describe('StoreProductManagementOperateLogComponent', () => {
  let component: StoreProductManagementOperateLogComponent;
  let fixture: ComponentFixture<StoreProductManagementOperateLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductManagementOperateLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductManagementOperateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
