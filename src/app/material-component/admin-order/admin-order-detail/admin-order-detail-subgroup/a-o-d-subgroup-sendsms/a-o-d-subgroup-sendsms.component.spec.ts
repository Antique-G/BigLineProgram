import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AODSubgroupSendsmsComponent } from './a-o-d-subgroup-sendsms.component';

describe('AODSubgroupSendsmsComponent', () => {
  let component: AODSubgroupSendsmsComponent;
  let fixture: ComponentFixture<AODSubgroupSendsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AODSubgroupSendsmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AODSubgroupSendsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
