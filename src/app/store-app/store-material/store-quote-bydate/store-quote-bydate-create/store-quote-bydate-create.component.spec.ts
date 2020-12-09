import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreQuoteBydateCreateComponent } from './store-quote-bydate-create.component';

describe('StoreQuoteBydateCreateComponent', () => {
  let component: StoreQuoteBydateCreateComponent;
  let fixture: ComponentFixture<StoreQuoteBydateCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreQuoteBydateCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreQuoteBydateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
