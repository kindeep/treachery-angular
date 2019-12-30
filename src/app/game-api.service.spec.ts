import { TestBed } from '@angular/core/testing';

import { GameApiService } from './game-api.service';

describe('GameApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameApiService = TestBed.get(GameApiService);
    expect(service).toBeTruthy();
  });
});
