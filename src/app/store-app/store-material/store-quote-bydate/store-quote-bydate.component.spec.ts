import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreQuoteBydateComponent } from './store-quote-bydate.component';

describe('StoreQuoteBydateComponent', () => {
  let component: StoreQuoteBydateComponent;
  let fixture: ComponentFixture<StoreQuoteBydateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreQuoteBydateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreQuoteBydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
