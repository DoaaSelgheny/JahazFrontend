import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBrandManagerComponent } from './dashboard-brand-manager.component';

describe('DashboardBrandManagerComponent', () => {
  let component: DashboardBrandManagerComponent;
  let fixture: ComponentFixture<DashboardBrandManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardBrandManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBrandManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
