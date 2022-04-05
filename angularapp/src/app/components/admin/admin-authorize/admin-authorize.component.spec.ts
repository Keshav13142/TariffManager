import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorizeComponent } from './admin-authorize.component';

describe('AdminAuthorizeComponent', () => {
  let component: AdminAuthorizeComponent;
  let fixture: ComponentFixture<AdminAuthorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthorizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
