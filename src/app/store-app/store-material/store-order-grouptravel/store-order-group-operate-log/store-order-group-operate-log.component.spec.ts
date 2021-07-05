import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupOperateLogComponent } from './store-order-group-operate-log.component';

describe('StoreOrderGroupOperateLogComponent', () => {
  let component: StoreOrderGroupOperateLogComponent;
  let fixture: ComponentFixture<StoreOrderGroupOperateLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupOperateLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupOperateLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
