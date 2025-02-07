import { TestBed } from '@angular/core/testing';

import { AnnonceResolveService } from './annonce-resolve.service';

describe('AnnonceResolveService', () => {
  let service: AnnonceResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnonceResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
