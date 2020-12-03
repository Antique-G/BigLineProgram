import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTermsManagementDetailComponent } from './store-terms-management-detail.component';

describe('StoreTermsManagementDetailComponent', () => {
  let component: StoreTermsManagementDetailComponent;
  let fixture: ComponentFixture<StoreTermsManagementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTermsManagementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTermsManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
