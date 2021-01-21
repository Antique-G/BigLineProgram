import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTouristCreateComponent } from './store-tourist-create.component';

describe('StoreTouristCreateComponent', () => {
  let component: StoreTouristCreateComponent;
  let fixture: ComponentFixture<StoreTouristCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTouristCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTouristCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
