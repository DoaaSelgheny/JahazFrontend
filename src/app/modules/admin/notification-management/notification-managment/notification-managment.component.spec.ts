import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationManagmentComponent } from './notification-managment.component';

describe('NotificationManagmentComponent', () => {
  let component: NotificationManagmentComponent;
  let fixture: ComponentFixture<NotificationManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
