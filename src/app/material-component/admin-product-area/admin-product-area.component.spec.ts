import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAreaComponent } from './admin-product-area.component';

describe('AdminProductAreaComponent', () => {
  let component: AdminProductAreaComponent;
  let fixture: ComponentFixture<AdminProductAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
