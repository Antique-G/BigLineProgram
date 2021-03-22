import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AOGTDetailChangeDataComponent } from './a-o-g-t-detail-change-data.component';

describe('AOGTDetailChangeDataComponent', () => {
  let component: AOGTDetailChangeDataComponent;
  let fixture: ComponentFixture<AOGTDetailChangeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AOGTDetailChangeDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AOGTDetailChangeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
