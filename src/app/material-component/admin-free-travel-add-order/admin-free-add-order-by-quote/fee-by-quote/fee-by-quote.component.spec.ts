import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeByQuoteComponent } from './fee-by-quote.component';

describe('FeeByQuoteComponent', () => {
  let component: FeeByQuoteComponent;
  let fixture: ComponentFixture<FeeByQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeByQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeByQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
