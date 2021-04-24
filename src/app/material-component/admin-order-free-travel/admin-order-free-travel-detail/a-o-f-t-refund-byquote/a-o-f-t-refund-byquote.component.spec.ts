import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AOFTRefundByquoteComponent } from './a-o-f-t-refund-byquote.component';

describe('AOFTRefundByquoteComponent', () => {
  let component: AOFTRefundByquoteComponent;
  let fixture: ComponentFixture<AOFTRefundByquoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AOFTRefundByquoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AOFTRefundByquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
