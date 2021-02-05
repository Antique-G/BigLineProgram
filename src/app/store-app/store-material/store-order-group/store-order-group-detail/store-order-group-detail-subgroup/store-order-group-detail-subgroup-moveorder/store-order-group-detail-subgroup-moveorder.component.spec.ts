import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupDetailSubgroupMoveorderComponent } from './store-order-group-detail-subgroup-moveorder.component';

describe('StoreOrderGroupDetailSubgroupMoveorderComponent', () => {
  let component: StoreOrderGroupDetailSubgroupMoveorderComponent;
  let fixture: ComponentFixture<StoreOrderGroupDetailSubgroupMoveorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupDetailSubgroupMoveorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupDetailSubgroupMoveorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
