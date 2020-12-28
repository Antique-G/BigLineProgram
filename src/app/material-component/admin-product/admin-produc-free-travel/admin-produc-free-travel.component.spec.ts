import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProducFreeTravelComponent } from './admin-produc-free-travel.component';

describe('AdminProducFreeTravelComponent', () => {
  let component: AdminProducFreeTravelComponent;
  let fixture: ComponentFixture<AdminProducFreeTravelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProducFreeTravelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProducFreeTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
