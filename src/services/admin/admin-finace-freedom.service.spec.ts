import { TestBed } from '@angular/core/testing';
import { AdminFinaceFreedomService } from './admin-finace-freedom.service';


describe('AdminFinaceFreedomService', () => {
  let service: AdminFinaceFreedomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFinaceFreedomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
