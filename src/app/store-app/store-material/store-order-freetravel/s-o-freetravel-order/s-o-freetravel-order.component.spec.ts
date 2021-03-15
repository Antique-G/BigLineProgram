import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SOFreetravelOrderComponent } from './s-o-freetravel-order.component';

describe('SOFreetravelOrderComponent', () => {
  let component: SOFreetravelOrderComponent;
  let fixture: ComponentFixture<SOFreetravelOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SOFreetravelOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SOFreetravelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
