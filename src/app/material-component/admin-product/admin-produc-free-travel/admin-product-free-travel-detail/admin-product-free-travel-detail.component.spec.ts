import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductFreeTravelDetailComponent } from './admin-product-free-travel-detail.component';

describe('AdminProductFreeTravelDetailComponent', () => {
  let component: AdminProductFreeTravelDetailComponent;
  let fixture: ComponentFixture<AdminProductFreeTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductFreeTravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductFreeTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
