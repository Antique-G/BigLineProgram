import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCostTypeComponent } from './store-cost-type.component';

describe('StoreCostTypeComponent', () => {
  let component: StoreCostTypeComponent;
  let fixture: ComponentFixture<StoreCostTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCostTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCostTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
