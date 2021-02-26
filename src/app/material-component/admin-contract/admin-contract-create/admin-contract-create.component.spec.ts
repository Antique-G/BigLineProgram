import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContractCreateComponent } from './admin-contract-create.component';

describe('AdminContractCreateComponent', () => {
  let component: AdminContractCreateComponent;
  let fixture: ComponentFixture<AdminContractCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContractCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContractCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
