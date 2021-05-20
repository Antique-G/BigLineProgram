import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCostTypeCreateComponent } from './store-cost-type-create.component';

describe('StoreCostTypeCreateComponent', () => {
  let component: StoreCostTypeCreateComponent;
  let fixture: ComponentFixture<StoreCostTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCostTypeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCostTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
