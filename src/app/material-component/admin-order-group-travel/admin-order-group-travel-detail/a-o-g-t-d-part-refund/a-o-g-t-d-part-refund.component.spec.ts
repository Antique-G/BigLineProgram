import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AOGTDPartRefundComponent } from './a-o-g-t-d-part-refund.component';

describe('AOGTDPartRefundComponent', () => {
  let component: AOGTDPartRefundComponent;
  let fixture: ComponentFixture<AOGTDPartRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AOGTDPartRefundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AOGTDPartRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
