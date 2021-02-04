import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupDetailSubgroupComponent } from './store-order-group-detail-subgroup.component';

describe('StoreOrderGroupDetailSubgroupComponent', () => {
  let component: StoreOrderGroupDetailSubgroupComponent;
  let fixture: ComponentFixture<StoreOrderGroupDetailSubgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupDetailSubgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupDetailSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
