import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductFreeTravelQutedateComponent } from './admin-product-free-travel-qutedate.component';

describe('AdminProductFreeTravelQutedateComponent', () => {
  let component: AdminProductFreeTravelQutedateComponent;
  let fixture: ComponentFixture<AdminProductFreeTravelQutedateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductFreeTravelQutedateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductFreeTravelQutedateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
