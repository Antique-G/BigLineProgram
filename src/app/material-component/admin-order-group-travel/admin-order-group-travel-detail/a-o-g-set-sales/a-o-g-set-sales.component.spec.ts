import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AOGSetSalesComponent } from './a-o-g-set-sales.component';

describe('AOGSetSalesComponent', () => {
  let component: AOGSetSalesComponent;
  let fixture: ComponentFixture<AOGSetSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AOGSetSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AOGSetSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
