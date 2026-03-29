import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodicsDetailsComponent } from './foodics-details.component';

describe('FoodicsDetailsComponent', () => {
  let component: FoodicsDetailsComponent;
  let fixture: ComponentFixture<FoodicsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodicsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodicsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
