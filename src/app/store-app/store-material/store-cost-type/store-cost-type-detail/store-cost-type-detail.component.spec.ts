import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCostTypeDetailComponent } from './store-cost-type-detail.component';

describe('StoreCostTypeDetailComponent', () => {
  let component: StoreCostTypeDetailComponent;
  let fixture: ComponentFixture<StoreCostTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCostTypeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCostTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
