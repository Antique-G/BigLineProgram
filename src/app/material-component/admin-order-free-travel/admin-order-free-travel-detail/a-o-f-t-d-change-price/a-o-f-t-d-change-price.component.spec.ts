import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AOFTDChangePriceComponent } from './a-o-f-t-d-change-price.component';

describe('AOFTDChangePriceComponent', () => {
  let component: AOFTDChangePriceComponent;
  let fixture: ComponentFixture<AOFTDChangePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AOFTDChangePriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AOFTDChangePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
