import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenerateContractComponent } from './admin-generate-contract.component';

describe('AdminGenerateContractComponent', () => {
  let component: AdminGenerateContractComponent;
  let fixture: ComponentFixture<AdminGenerateContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGenerateContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGenerateContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
