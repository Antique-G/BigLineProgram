import { TestBed } from '@angular/core/testing';

import { AdminMeetingPlaceService } from './admin-meeting-place.service';

describe('AdminMeetingPlaceService', () => {
  let service: AdminMeetingPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMeetingPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
