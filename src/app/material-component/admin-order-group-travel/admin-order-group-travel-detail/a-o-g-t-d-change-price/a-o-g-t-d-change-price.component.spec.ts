import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AOGTDChangePriceComponent } from './a-o-g-t-d-change-price.component';

describe('AOGTDChangePriceComponent', () => {
  let component: AOGTDChangePriceComponent;
  let fixture: ComponentFixture<AOGTDChangePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AOGTDChangePriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AOGTDChangePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
