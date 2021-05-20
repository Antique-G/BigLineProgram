import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePreFreeSaleListDetailComponent } from './store-pre-free-sale-list-detail.component';

describe('StorePreFreeSaleListDetailComponent', () => {
  let component: StorePreFreeSaleListDetailComponent;
  let fixture: ComponentFixture<StorePreFreeSaleListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePreFreeSaleListDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePreFreeSaleListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
