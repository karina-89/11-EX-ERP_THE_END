import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemscategoriesComponent } from './itemscategories.component';

describe('ItemscategoriesComponent', () => {
  let component: ItemscategoriesComponent;
  let fixture: ComponentFixture<ItemscategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemscategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemscategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
