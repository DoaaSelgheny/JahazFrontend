import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAlertComponent } from './category-alert.component';

describe('CategoryAlertComponent', () => {
  let component: CategoryAlertComponent;
  let fixture: ComponentFixture<CategoryAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
