import { TestBed } from '@angular/core/testing';

import { TaskresolverserviceService } from './taskresolverservice.service';

describe('TaskresolverserviceService', () => {
  let service: TaskresolverserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskresolverserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
