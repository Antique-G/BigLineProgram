import { TestBed } from '@angular/core/testing';

import { StoreTouristService } from './store-tourist.service';

describe('StoreTouristService', () => {
  let service: StoreTouristService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreTouristService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
