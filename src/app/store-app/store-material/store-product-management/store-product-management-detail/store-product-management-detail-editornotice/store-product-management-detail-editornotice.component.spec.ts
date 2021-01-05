import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProductManagementDetailEditornoticeComponent } from './store-product-management-detail-editornotice.component';

describe('StoreProductManagementDetailEditornoticeComponent', () => {
  let component: StoreProductManagementDetailEditornoticeComponent;
  let fixture: ComponentFixture<StoreProductManagementDetailEditornoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProductManagementDetailEditornoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProductManagementDetailEditornoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
