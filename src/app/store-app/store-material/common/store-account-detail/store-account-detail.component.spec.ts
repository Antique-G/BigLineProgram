import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAccountDetailComponent } from './store-account-detail.component';

describe('AccountDetailComponent', () => {
  let component: StoreAccountDetailComponent;
  let fixture: ComponentFixture<StoreAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreAccountDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
