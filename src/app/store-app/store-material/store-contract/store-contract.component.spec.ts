import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreContractComponent } from './store-contract.component';

describe('StoreContractComponent', () => {
  let component: StoreContractComponent;
  let fixture: ComponentFixture<StoreContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
