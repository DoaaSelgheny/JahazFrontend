import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBranchManagerComponent } from './add-branch-manager.component';

describe('AddBranchManagerComponent', () => {
  let component: AddBranchManagerComponent;
  let fixture: ComponentFixture<AddBranchManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBranchManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBranchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
