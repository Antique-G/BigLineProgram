import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AODShutOffComponent } from './a-o-d-shut-off.component';

describe('AODShutOffComponent', () => {
  let component: AODShutOffComponent;
  let fixture: ComponentFixture<AODShutOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AODShutOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AODShutOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
