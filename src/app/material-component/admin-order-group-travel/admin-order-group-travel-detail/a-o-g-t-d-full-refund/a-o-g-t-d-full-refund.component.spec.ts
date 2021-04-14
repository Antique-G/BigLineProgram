import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AOGTDFullRefundComponent } from './a-o-g-t-d-full-refund.component';

describe('AOGTDFullRefundComponent', () => {
  let component: AOGTDFullRefundComponent;
  let fixture: ComponentFixture<AOGTDFullRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AOGTDFullRefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AOGTDFullRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
