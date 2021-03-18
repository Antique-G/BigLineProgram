import { TestBed } from '@angular/core/testing';

import { AdminTouristService } from './admin-tourist.service';

describe('AdminTouristService', () => {
  let service: AdminTouristService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTouristService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
