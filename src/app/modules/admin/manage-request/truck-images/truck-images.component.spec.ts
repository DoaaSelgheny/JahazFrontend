import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckImagesComponent } from './truck-images.component';

describe('TruckImagesComponent', () => {
  let component: TruckImagesComponent;
  let fixture: ComponentFixture<TruckImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
