import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AODSubgroupSetguideComponent } from './a-o-d-subgroup-setguide.component';

describe('AODSubgroupSetguideComponent', () => {
  let component: AODSubgroupSetguideComponent;
  let fixture: ComponentFixture<AODSubgroupSetguideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AODSubgroupSetguideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AODSubgroupSetguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
