import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemscategoriesFormComponent } from './itemscategories-form.component';

describe('ItemscategoriesFormComponent', () => {
  let component: ItemscategoriesFormComponent;
  let fixture: ComponentFixture<ItemscategoriesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemscategoriesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemscategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
