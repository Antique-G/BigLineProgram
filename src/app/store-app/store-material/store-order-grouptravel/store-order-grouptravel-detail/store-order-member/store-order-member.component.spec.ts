import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOrderMemberComponent } from './store-order-member.component';

describe('StoreOrderMemberComponent', () => {
  let component: StoreOrderMemberComponent;
  let fixture: ComponentFixture<StoreOrderMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOrderMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreOrderMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
