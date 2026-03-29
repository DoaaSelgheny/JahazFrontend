import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchManagerManagementComponent } from './branch-manager-management.component';

describe('BranchManagerManagementComponent', () => {
  let component: BranchManagerManagementComponent;
  let fixture: ComponentFixture<BranchManagerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchManagerManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchManagerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
