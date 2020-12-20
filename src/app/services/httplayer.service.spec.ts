import { TestBed } from '@angular/core/testing';

import { HttplayerService } from './httplayer.service';

describe('HttplayerService', () => {
  let service: HttplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
