import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemPointsCashierComponent } from './redeem-points-cashier.component';

describe('RedeemPointsCashierComponent', () => {
  let component: RedeemPointsCashierComponent;
  let fixture: ComponentFixture<RedeemPointsCashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeemPointsCashierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedeemPointsCashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
