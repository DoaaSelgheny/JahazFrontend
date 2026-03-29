import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantsManagementComponent } from './accountants-management.component';

describe('AccountantsManagementComponent', () => {
  let component: AccountantsManagementComponent;
  let fixture: ComponentFixture<AccountantsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountantsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountantsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
