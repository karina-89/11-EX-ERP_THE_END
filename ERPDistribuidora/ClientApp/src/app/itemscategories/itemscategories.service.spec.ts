import { TestBed } from '@angular/core/testing';

import { ItemscategoriesService } from './itemscategories.service';

describe('ItemscategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemscategoriesService = TestBed.get(ItemscategoriesService);
    expect(service).toBeTruthy();
  });
});
