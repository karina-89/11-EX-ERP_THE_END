import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesModalComponent } from './employees-modal.component';

describe('EmployeesModalComponent', () => {
  let component: EmployeesModalComponent;
  let fixture: ComponentFixture<EmployeesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
