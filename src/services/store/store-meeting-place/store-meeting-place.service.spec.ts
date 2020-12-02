import { TestBed } from '@angular/core/testing';

import { StoreMeetingPlaceService } from './store-meeting-place.service';

describe('StoreMeetingPlaceService', () => {
  let service: StoreMeetingPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreMeetingPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
