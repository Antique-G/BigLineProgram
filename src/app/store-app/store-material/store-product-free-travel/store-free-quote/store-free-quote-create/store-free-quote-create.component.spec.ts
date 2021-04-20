import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFreeQuoteCreateComponent } from './store-free-quote-create.component';

describe('StoreFreeQuoteCreateComponent', () => {
  let component: StoreFreeQuoteCreateComponent;
  let fixture: ComponentFixture<StoreFreeQuoteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreFreeQuoteCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFreeQuoteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
