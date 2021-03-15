import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AOFreetravelOrderComponent } from './a-o-freetravel-order.component';

describe('AOFreetravelOrderComponent', () => {
  let component: AOFreetravelOrderComponent;
  let fixture: ComponentFixture<AOFreetravelOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AOFreetravelOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AOFreetravelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
