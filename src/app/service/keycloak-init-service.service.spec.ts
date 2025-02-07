import { TestBed } from '@angular/core/testing';

import { KeycloakInitServiceService } from './keycloak-init-service.service';

describe('KeycloakInitServiceService', () => {
  let service: KeycloakInitServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakInitServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
