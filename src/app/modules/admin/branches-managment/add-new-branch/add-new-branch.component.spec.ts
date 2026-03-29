import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBranchComponent } from './add-new-branch.component';

describe('AddNewBranchComponent', () => {
  let component: AddNewBranchComponent;
  let fixture: ComponentFixture<AddNewBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
