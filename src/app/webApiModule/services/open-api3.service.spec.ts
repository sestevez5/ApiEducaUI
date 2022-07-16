import { HttpClient } from '@angular/common/http';
import { TestBed, inject, async } from '@angular/core/testing';

import { OpenApi3Service } from './open-api3.service';

describe('OpenApi3Service', () => {
  let service: OpenApi3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpClient]});
    service = TestBed.inject(OpenApi3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
