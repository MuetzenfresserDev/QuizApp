/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestDataService } from './requestData.service';

describe('Service: RequestData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestDataService]
    });
  });

  it('should ...', inject([RequestDataService], (service: RequestDataService) => {
    expect(service).toBeTruthy();
  }));
});
