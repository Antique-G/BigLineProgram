import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContractComponent } from './admin-contract.component';

describe('AdminContractComponent', () => {
  let component: AdminContractComponent;
  let fixture: ComponentFixture<AdminContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
