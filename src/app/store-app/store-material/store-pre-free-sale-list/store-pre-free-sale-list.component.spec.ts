import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePreFreeSaleListComponent } from './store-pre-free-sale-list.component';

describe('StorePreFreeSaleListComponent', () => {
  let component: StorePreFreeSaleListComponent;
  let fixture: ComponentFixture<StorePreFreeSaleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorePreFreeSaleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePreFreeSaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
