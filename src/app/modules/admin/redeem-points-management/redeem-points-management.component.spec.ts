import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemPointsManagementComponent } from './redeem-points-management.component';

describe('RedeemPointsManagementComponent', () => {
  let component: RedeemPointsManagementComponent;
  let fixture: ComponentFixture<RedeemPointsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeemPointsManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemPointsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
