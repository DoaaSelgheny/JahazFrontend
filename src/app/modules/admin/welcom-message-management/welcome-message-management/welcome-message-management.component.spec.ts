import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeMessageManagementComponent } from './welcome-message-management.component';

describe('WelcomeMessageManagementComponent', () => {
  let component: WelcomeMessageManagementComponent;
  let fixture: ComponentFixture<WelcomeMessageManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeMessageManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeMessageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
