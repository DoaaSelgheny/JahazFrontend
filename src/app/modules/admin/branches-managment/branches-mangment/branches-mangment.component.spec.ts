import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesMangmentComponent } from './branches-mangment.component';

describe('BranchesMangmentComponent', () => {
  let component: BranchesMangmentComponent;
  let fixture: ComponentFixture<BranchesMangmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchesMangmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchesMangmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
