import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPreSaleListComponent } from './admin-pre-sale-list.component';

describe('AdminPreSaleListComponent', () => {
  let component: AdminPreSaleListComponent;
  let fixture: ComponentFixture<AdminPreSaleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPreSaleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPreSaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
