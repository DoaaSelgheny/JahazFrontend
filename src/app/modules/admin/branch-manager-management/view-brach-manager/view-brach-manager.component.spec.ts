import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBrachManagerComponent } from './view-brach-manager.component';

describe('ViewBrachManagerComponent', () => {
  let component: ViewBrachManagerComponent;
  let fixture: ComponentFixture<ViewBrachManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBrachManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBrachManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
