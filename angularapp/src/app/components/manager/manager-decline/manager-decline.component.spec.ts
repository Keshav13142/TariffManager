import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDeclineComponent } from './manager-decline.component';

describe('ManagerDeclineComponent', () => {
  let component: ManagerDeclineComponent;
  let fixture: ComponentFixture<ManagerDeclineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerDeclineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDeclineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
