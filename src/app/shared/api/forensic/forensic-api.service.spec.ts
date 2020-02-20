import { TestBed } from '@angular/core/testing';

import { ForensicApiService } from './forensic-api.service';

describe('ForensicApiService', () => {
  let service: ForensicApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForensicApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
