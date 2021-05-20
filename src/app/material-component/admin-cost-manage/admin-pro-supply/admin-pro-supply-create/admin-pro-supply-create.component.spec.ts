import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProSupplyCreateComponent } from './admin-pro-supply-create.component';

describe('AdminProSupplyCreateComponent', () => {
  let component: AdminProSupplyCreateComponent;
  let fixture: ComponentFixture<AdminProSupplyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProSupplyCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProSupplyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
