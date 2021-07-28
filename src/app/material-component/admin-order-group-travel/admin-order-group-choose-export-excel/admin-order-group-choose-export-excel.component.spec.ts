import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderGroupChooseExportExcelComponent } from './admin-order-group-choose-export-excel.component';

describe('AdminOrderGroupChooseExportExcelComponent', () => {
  let component: AdminOrderGroupChooseExportExcelComponent;
  let fixture: ComponentFixture<AdminOrderGroupChooseExportExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrderGroupChooseExportExcelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderGroupChooseExportExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
