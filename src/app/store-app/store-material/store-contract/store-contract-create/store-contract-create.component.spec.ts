import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreContractCreateComponent } from './store-contract-create.component';

describe('StoreContractCreateComponent', () => {
  let component: StoreContractCreateComponent;
  let fixture: ComponentFixture<StoreContractCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreContractCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreContractCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
