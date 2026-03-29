import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {
  CountryISO,
  NgxIntlTelephoneInputComponent,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first, forkJoin } from 'rxjs';
import { ManageNotificationsService } from 'src/app/services/api/manage-notifications.service';
import { OrderManagementService } from 'src/app/services/api/user-management.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent implements OnInit {
  userModalForm: FormGroup;
  isEdit: boolean;
  isdisabledEdit: boolean;
  cameraNumber: any;
  carTypes: any;
  carModels: any;
  manageCarbyidData: any;
  phoneNumberPlaceholder:any
  id: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  isLoading=true;
  notificationID: any;
  public CountryISO: any;
  public PhoneNumberFormat: any;
  public SearchCountryField: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formbuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private manageNotificationsService: ManageNotificationsService,
    private _UserManagementService: OrderManagementService,
    private modalService: NgbModal
  ) {
    this.CountryISO = CountryISO;
    this.PhoneNumberFormat = PhoneNumberFormat;
    this.SearchCountryField = SearchCountryField;
  }
@ViewChild('mobileNumber') mobileNumber!: NgxIntlTelephoneInputComponent;
  ngOnInit(): void {
    this.adduserForm();

    this.getData();
  }
  getDataForCar() {
    this._UserManagementService.manageCarbyid(this.id).subscribe({
      next: (res) => {
        this.isEdit = true;
        this.isdisabledEdit = true;
        res.carId = res.id;
         this.phoneNumberPlaceholder=res.phoneNumber
        this.userModalForm.patchValue(res);
     
          this.isLoading=false;
        this.manageCarbyidData = res;
        this.cdr.detectChanges();
      },
      error: (err) => {},
    });
  }
  public onInputChange(event: any) {
    if (event.isNumberValid) {
      this.userModalForm
        .get('phoneNumber')
        ?.setValue(
          event.phoneNumber.replace(/\s/g, '').split('+' + event.dialCode)[1]
        );
      this.userModalForm.get('countryCode')?.setValue(event.dialCode);
      this.userModalForm.get('countryCodeIso')?.setValue(event.iso2Code);
    } else {
      // this.userModalForm.get('phoneNumber')?.markAsTouched({ onlySelf: true });
      // this.userModalForm.get('phoneNumber')?.setErrors({ required: true });
    }
  }

  adduserForm() {
    this.userModalForm = this.formbuilder.group({
      carNumber: [null, [Validators.required]],
      carYear: [null, [Validators.required]],
      carColor: [null, [Validators.required]],
      phoneNumber: [null],
      fullName: [null],
      cameraNumber: this.cameraNumber,
      countryCode: [966],
      countryCodeIso: ['SA'],
      carMakeModel: [null, [Validators.required]],
      carMake: [null, [Validators.required]],
      carId: [0],
    });
  }

  getData() {
    forkJoin([this._UserManagementService.getcarType()]).subscribe({
      next: ([CarType]) => {
        this.carTypes = CarType;
        if (this.id) {
          this.getDataForCar();
        }else{
             this.isLoading=false;
        }

        this.spinner.hide();
     
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.spinner.hide();
      },
    });
  }

  public submit() {
    if (this.userModalForm.invalid) {
      Object.keys(this.userModalForm.controls).forEach((field) => {
        // {1}
        const control = this.userModalForm.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
      });
      return;
    }
    if (this.userModalForm.valid) {
      this.spinner.show();
      this._UserManagementService
        .addUser(this.userModalForm.value)
        .pipe(first())
        .subscribe({
          next: (user) => {
            this.spinner.hide();
            this.toastr.success(this.translate.instant('users.addSuccess'));
            if (this.notificationID) {
              this.manageNotificationsService
                .usedNotifications(this.notificationID)
                .subscribe((res) => {
                  console.log('usedNotifications');
                });
            }

            this.modalService.dismissAll('Cross click');
            this.passEntry.emit(true);
          },
          error: (err) => {
            this.spinner.hide();
            this.toastr.error(err.error.error.message);
          },
        });
    }
  }
  closeModal() {
    this.passEntry.emit(false);
    this.modalService.dismissAll('Cross click');
  }
}
