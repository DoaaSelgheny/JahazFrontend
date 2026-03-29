import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { BranchesService } from 'src/app/services/api/branches.service';

@Component({
  selector: 'app-add-camera',
  templateUrl: './add-camera.component.html',
  styleUrls: ['./add-camera.component.scss'],
})
export class AddCameraComponent implements OnInit {
  form: FormGroup;
  isAdmin: true;
  id: any;
  isDisabled: boolean = true;
  @Input() cameradata: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  isValidFormSubmitted: boolean | null = null;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private branchesService: BranchesService,
    private modalService: NgbModal,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      cameras: this.formBuilder.array([
        this.formBuilder.group({
          number: [null, [Validators.required]],
        }),
      ]),
    });
  }

  addOption() {
    this.cameras.push(
      this.formBuilder.group({
        number: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      })
    );
  }

  get cameras() {
    return this.form.get('cameras') as FormArray;
  }
  ngOnInit(): void {
    if (this.isAdmin) {
      this.branchesService.manageCamera(this.id).subscribe((res) => {
        this.cameradata = res;
        for (let index = 1; index < this.cameradata.length; index++) {
          this.addOption();
        }

        this.form.patchValue({ cameras: this.cameradata });
      });
    } else {
      for (let index = 1; index < this.cameradata.length; index++) {
        this.addOption();
      }

      this.form.patchValue({ cameras: this.cameradata });
    }
  }

  submit() {
    this.isValidFormSubmitted = false;
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((field) => {
        // {1}
        const control = this.form.get(field); // {2}
        control?.markAsTouched({ onlySelf: true }); // {3}
      });
      return;
    }
    this.isValidFormSubmitted = true;
    if (this.form.valid) {
      if (this.isAdmin) {
        this.branchesService
          .editCamera({ branchId: this.id, ...this.form.value })
          .pipe(first())
          .subscribe({
            next: (data) => {
              this.spinner.hide();
              this.toastr.success(this.translate.instant('users.addSuccess'));
              this.modalService.dismissAll('Cross click');
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() =>
                  this.router.navigate(['/admin/branches-management'])
                );
            },
            error: (err) => {
              this.spinner.hide();
              this.toastr.error(err.error.error.message);
            },
          });
      } else {
        this.modalService.dismissAll('Cross click');
        this.passEntry.emit(this.form.value.cameras);
      }
    }
  }
  closeModal() {
    this.passEntry.emit(this.form.value.cameras);
    this.modalService.dismissAll('Cross click');
  }
}
