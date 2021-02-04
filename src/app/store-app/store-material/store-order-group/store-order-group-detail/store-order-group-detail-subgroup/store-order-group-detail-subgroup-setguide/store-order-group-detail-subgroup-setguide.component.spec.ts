import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupDetailSubgroupSetguideComponent } from './store-order-group-detail-subgroup-setguide.component';

describe('StoreOrderGroupDetailSubgroupSetguideComponent', () => {
  let component: StoreOrderGroupDetailSubgroupSetguideComponent;
  let fixture: ComponentFixture<StoreOrderGroupDetailSubgroupSetguideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupDetailSubgroupSetguideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupDetailSubgroupSetguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
