import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { BrandService } from 'src/app/services/api/brand.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss'],
})
export class AddBrandComponent implements OnInit {
  form: FormGroup;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private formbuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private brandService: BrandService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.addBrandForm();
  }

  addBrandForm() {
    this.form = this.formbuilder.group({
      name: [null, [Validators.required]],
    });
  }

  public submit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((field) => {
        // {1}
        const control = this.form.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
      });
      return;
    }
    if (this.form.valid) {
      this.spinner.show();
      this.brandService
        .addBrand(this.form.value)
        .pipe(first())
        .subscribe({
          next: (data) => {
            this.spinner.hide();
            this.toastr.success(this.translate.instant('users.addSuccess'));
            // this.modalService.dismissAll('Cross click');
            this.activeModal.close();
            this.passEntry.emit(data);
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
    this.activeModal.close();
    // this.modalService.dismissAll('Cross click');
  }
}
