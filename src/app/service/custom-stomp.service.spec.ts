import { TestBed } from '@angular/core/testing';

import { CustomStompService } from './custom-stomp.service';

describe('CustomStompService', () => {
  let service: CustomStompService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomStompService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
