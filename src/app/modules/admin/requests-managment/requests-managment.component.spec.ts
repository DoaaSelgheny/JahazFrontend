import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestsManagmentComponent } from './requests-managment.component';

describe('MembersComponent', () => {
  let component: RequestsManagmentComponent;
  let fixture: ComponentFixture<RequestsManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestsManagmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
