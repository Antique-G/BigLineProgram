import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupDetailSubgroupSentsmsComponent } from './store-order-group-detail-subgroup-sentsms.component';

describe('StoreOrderGroupDetailSubgroupSentsmsComponent', () => {
  let component: StoreOrderGroupDetailSubgroupSentsmsComponent;
  let fixture: ComponentFixture<StoreOrderGroupDetailSubgroupSentsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupDetailSubgroupSentsmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupDetailSubgroupSentsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
