import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemscategoriesModalComponent } from './itemscategories-modal.component';

describe('ItemscategoriesModalComponent', () => {
  let component: ItemscategoriesModalComponent;
  let fixture: ComponentFixture<ItemscategoriesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemscategoriesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemscategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
