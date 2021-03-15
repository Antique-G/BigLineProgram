import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreProUSCreateComponent } from './store-pro-u-s-create.component';

describe('StoreProUSCreateComponent', () => {
  let component: StoreProUSCreateComponent;
  let fixture: ComponentFixture<StoreProUSCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreProUSCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreProUSCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
