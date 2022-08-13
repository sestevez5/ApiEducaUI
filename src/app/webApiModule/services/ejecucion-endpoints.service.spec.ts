import { TestBed } from '@angular/core/testing';

import { EjecucionEndpointsService } from './ejecucion-endpoints.service';

describe('EjecucionEndpointsService', () => {
  let service: EjecucionEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EjecucionEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
