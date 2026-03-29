import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewWelcomeMessageComponent } from './review-welcome-message.component';

describe('ReviewWelcomeMessageComponent', () => {
  let component: ReviewWelcomeMessageComponent;
  let fixture: ComponentFixture<ReviewWelcomeMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewWelcomeMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewWelcomeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
