/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlayerNameService } from './playerName.service';

describe('Service: PlayerName', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerNameService]
    });
  });

  it('should ...', inject([PlayerNameService], (service: PlayerNameService) => {
    expect(service).toBeTruthy();
  }));
});
