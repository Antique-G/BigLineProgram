import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPriceDetailComponent } from './group-price-detail.component';

describe('GroupPriceDetailComponent', () => {
  let component: GroupPriceDetailComponent;
  let fixture: ComponentFixture<GroupPriceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPriceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPriceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
