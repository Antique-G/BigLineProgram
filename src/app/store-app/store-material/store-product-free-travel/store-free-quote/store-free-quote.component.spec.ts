import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreeQuoteComponent } from './store-free-quote.component';

describe('StoreFreeQuoteComponent', () => {
  let component: StoreFreeQuoteComponent;
  let fixture: ComponentFixture<StoreFreeQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreeQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreeQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
