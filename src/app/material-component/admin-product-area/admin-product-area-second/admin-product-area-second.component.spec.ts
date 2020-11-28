import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAreaSecondComponent } from './admin-product-area-second.component';

describe('AdminProductAreaSecondComponent', () => {
  let component: AdminProductAreaSecondComponent;
  let fixture: ComponentFixture<AdminProductAreaSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAreaSecondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductAreaSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
