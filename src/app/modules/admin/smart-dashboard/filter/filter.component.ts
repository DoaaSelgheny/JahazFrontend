import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { BrandService } from 'src/app/services/api/brand.service';
import { FirstTabService } from 'src/app/services/api/first-tab.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filterForm!: FormGroup;
  // sex = [ 'انثي', 'ذكر'];
  // TimePeriod = [ 'مساء', 'صباحا'];
  // Vehicles = [ 'مرسيدس', 'تويتا '];
  countries: any = [];
  cities: any = [];
  currentLang!: string;

  @Input() data: any;
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private FirstTabService: FirstTabService,
    private brandService: BrandService,
    private translate: TranslateService
  ) {}
  openCalendar(input: HTMLInputElement) {
    (input as any).showPicker();
  }

  getCountry() {
    this.brandService.getAllCountries().subscribe((res) => {
      this.countries = res;
    });
  }
  getCity(id: any) {
    this.FirstTabService.ManageCity(id).subscribe((res) => {
      this.cities = res;
    });
  }
  onItemSelectCountry() {
    this.getCity(this.filterForm.get('country')?.value);
  }

  removeCities() {
    this.cities = [];
  }
  ngOnInit() {
    this.getCountry();
    this.filterForm = this.fb.group({
      search: [''],
      // startDate: [''],
      Date: [''],
      city: [''],
      country: [''],
      toDate: [''],
      // sex:[''],
      // TimePeriod:[''],
      // Vehicle:[''],

      // waitTime: [0]
    });
 
    if (this.data) {
      this.filterForm.patchValue(this.data);
       
  
      if (this.data.country) {
        this.getCity(this.data.country);
      }
    }

    this.currentLang =
      this.translate.currentLang || this.translate.getDefaultLang();
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
    this.filterForm.get('search')?.patchValue('');
    this.filterForm.get('Date')?.patchValue('');
    this.filterForm.get('city')?.patchValue('');
    this.filterForm.get('country')?.patchValue('');
    this.filterForm.get('toDate')?.patchValue('');
    this.activeModal.close(this.filterForm.value);
  }
  close() {
    this.activeModal.close();
  }
}
