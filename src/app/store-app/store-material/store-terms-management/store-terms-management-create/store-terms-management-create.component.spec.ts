import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTermsManagementCreateComponent } from './store-terms-management-create.component';

describe('StoreTermsManagementCreateComponent', () => {
  let component: StoreTermsManagementCreateComponent;
  let fixture: ComponentFixture<StoreTermsManagementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTermsManagementCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTermsManagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
