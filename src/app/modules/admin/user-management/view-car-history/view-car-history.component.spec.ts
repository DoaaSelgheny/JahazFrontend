import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCarHistoryComponent } from './view-car-history.component';

describe('ViewCarHistoryComponent', () => {
  let component: ViewCarHistoryComponent;
  let fixture: ComponentFixture<ViewCarHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCarHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCarHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
