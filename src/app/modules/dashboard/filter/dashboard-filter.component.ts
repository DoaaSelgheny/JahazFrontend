import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-filter',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss'],
})
export class DashboardFilterComponent implements OnInit {
  @Input() data: any;
  filterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      Date: [''],
      toDate: [''],
      search: [''],
      city: [''],
      country: [''],
    });

    if (this.data) {
      this.filterForm.patchValue(this.data);
    }
  }

  openCalendar(input: HTMLInputElement) {
    (input as any).showPicker?.();
  }

  applyFilter() {
    this.filterForm
      .get('Date')
      ?.setValue(
        this.filterForm.get('Date')?.value
          ? `${this.filterForm.get('Date')?.value}T00:00:00Z`
          : ''
      );
    this.filterForm
      .get('toDate')
      ?.setValue(
        this.filterForm.get('toDate')?.value
          ? `${this.filterForm.get('toDate')?.value}T23:59:59Z`
          : ''
      );

    this.activeModal.close(this.filterForm.value);
  }

  reset() {
    this.filterForm.reset({
      Date: '',
      toDate: '',
      search: '',
      city: '',
      country: '',
    });
    this.activeModal.close(this.filterForm.value);
  }

  close() {
    this.activeModal.close();
  }
}

