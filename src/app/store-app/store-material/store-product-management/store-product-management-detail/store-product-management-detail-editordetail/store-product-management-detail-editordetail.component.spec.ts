import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductManagementDetailEditordetailComponent } from './store-product-management-detail-editordetail.component';

describe('StoreProductManagementDetailEditordetailComponent', () => {
  let component: StoreProductManagementDetailEditordetailComponent;
  let fixture: ComponentFixture<StoreProductManagementDetailEditordetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductManagementDetailEditordetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductManagementDetailEditordetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
