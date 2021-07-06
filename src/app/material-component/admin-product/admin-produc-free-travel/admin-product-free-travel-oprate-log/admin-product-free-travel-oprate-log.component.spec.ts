import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductFreeTravelOprateLogComponent } from './admin-product-free-travel-oprate-log.component';

describe('AdminProductFreeTravelOprateLogComponent', () => {
  let component: AdminProductFreeTravelOprateLogComponent;
  let fixture: ComponentFixture<AdminProductFreeTravelOprateLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductFreeTravelOprateLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductFreeTravelOprateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
