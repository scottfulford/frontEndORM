import { TestBed } from '@angular/core/testing';

import { DogServiceService } from './dog-service.service';

describe('DogServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DogServiceService = TestBed.get(DogServiceService);
    expect(service).toBeTruthy();
  });
});
