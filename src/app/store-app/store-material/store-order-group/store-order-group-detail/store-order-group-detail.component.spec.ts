import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderGroupDetailComponent } from './store-order-group-detail.component';

describe('StoreOrderGroupDetailComponent', () => {
  let component: StoreOrderGroupDetailComponent;
  let fixture: ComponentFixture<StoreOrderGroupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderGroupDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
