import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFreeAddOrderByQuoteComponent } from './admin-free-add-order-by-quote.component';

describe('AdminFreeAddOrderByQuoteComponent', () => {
  let component: AdminFreeAddOrderByQuoteComponent;
  let fixture: ComponentFixture<AdminFreeAddOrderByQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFreeAddOrderByQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFreeAddOrderByQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
