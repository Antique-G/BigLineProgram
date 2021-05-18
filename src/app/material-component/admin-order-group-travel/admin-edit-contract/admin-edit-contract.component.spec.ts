import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditContractComponent } from './admin-edit-contract.component';

describe('AdminEditContractComponent', () => {
  let component: AdminEditContractComponent;
  let fixture: ComponentFixture<AdminEditContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
