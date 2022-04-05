import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserexpensesComponent } from './userexpenses.component';

describe('UserexpensesComponent', () => {
  let component: UserexpensesComponent;
  let fixture: ComponentFixture<UserexpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserexpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
