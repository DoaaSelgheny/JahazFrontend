import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRedeemPointsComponent } from './add-redeem-points.component';

describe('AddRedeemPointsComponent', () => {
  let component: AddRedeemPointsComponent;
  let fixture: ComponentFixture<AddRedeemPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRedeemPointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRedeemPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
