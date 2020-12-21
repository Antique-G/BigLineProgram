import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTermsManagementUpComponent } from './store-terms-management-up.component';

describe('StoreTermsManagementUpComponent', () => {
  let component: StoreTermsManagementUpComponent;
  let fixture: ComponentFixture<StoreTermsManagementUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTermsManagementUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTermsManagementUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
