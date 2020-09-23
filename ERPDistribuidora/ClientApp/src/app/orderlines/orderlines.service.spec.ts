import { TestBed } from '@angular/core/testing';

import { OrderlinesService } from './orderlines.service';

describe('OrderlinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderlinesService = TestBed.get(OrderlinesService);
    expect(service).toBeTruthy();
  });
});
