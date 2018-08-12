import { TestBed, inject } from '@angular/core/testing';

import { DormService } from './dorm.service';

describe('DormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DormService]
    });
  });

  it('should be created', inject([DormService], (service: DormService) => {
    expect(service).toBeTruthy();
  }));
});
