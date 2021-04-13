import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInsuredListComponent } from './admin-insured-list.component';

describe('AdminInsuredListComponent', () => {
  let component: AdminInsuredListComponent;
  let fixture: ComponentFixture<AdminInsuredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInsuredListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInsuredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
