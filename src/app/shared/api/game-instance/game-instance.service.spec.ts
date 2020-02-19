import { TestBed } from '@angular/core/testing';

import { GameInstanceService } from './game-instance.service';

describe('GameInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameInstanceService = TestBed.get(GameInstanceService);
    expect(service).toBeTruthy();
  });
});
