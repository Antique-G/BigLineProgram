import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AODChangeNumsComponent } from './a-o-d-change-nums.component';

describe('AODChangeNumsComponent', () => {
  let component: AODChangeNumsComponent;
  let fixture: ComponentFixture<AODChangeNumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AODChangeNumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AODChangeNumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
