import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTermsManagementComponent } from './store-terms-management.component';

describe('StoreTermsManagementComponent', () => {
  let component: StoreTermsManagementComponent;
  let fixture: ComponentFixture<StoreTermsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTermsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTermsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
