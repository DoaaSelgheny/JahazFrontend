import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrandManagerComponent } from './add-brand-manager.component';

describe('AddBrandManagerComponent', () => {
  let component: AddBrandManagerComponent;
  let fixture: ComponentFixture<AddBrandManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBrandManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBrandManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
