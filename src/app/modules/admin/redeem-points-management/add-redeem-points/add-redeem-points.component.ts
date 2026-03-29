import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { BrandService } from 'src/app/services/api/brand.service';
import { RedeemPointsService } from 'src/app/services/api/redeem-points.service';

@Component({
  selector: 'app-add-redeem-points',
  templateUrl: './add-redeem-points.component.html',
  styleUrls: ['./add-redeem-points.component.scss']
})
export class AddRedeemPointsComponent implements OnInit {
 form: FormGroup;
  isdisabledEdit: boolean;
  brands: any;
  @Input() id: string='';
  data: any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  isValidFormSubmitted: boolean | null = null;
  category=[]

  constructor(
    public activeModal: NgbActiveModal,
    private formbuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private brandservice:BrandService,
    private modalService: NgbModal,
    private redeemService: RedeemPointsService,

  ) {
  }

  ngOnInit(): void {
    this.getBrands();
    this.adduserForm();

    if(this.id){
      setTimeout(() => {
        this.GetCategory(+this.id)

      }, 1000);
    }
  }

  getBrands() {
    this.brandservice.getAllBrands().subscribe((res) => {
      this.brands = res;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }
  changeBrand(id:any){
    this.data = []
    this.points.patchValue(this.data)
    this.cdr.detectChanges()
    
  }
  getPointsById(id:any){
    this.id = id
    this.redeemService.getredeemPointsId(id).subscribe({
      next:next=>{
        this.data = next
        if(this.data){

          this.form.get('brandId')?.disable()


          this.form.patchValue({
            brandId : id,
            points: this.data
          });
        }
      }

    })


  }
  // Get Category 

  GetCategory(id:number)
  {
    if(this.id)
    {
      this.form.get('brandId')?.disable();

    }
    this.form.patchValue({
      brandId : id,
    });
    this.redeemService.GetCategory(id).subscribe((items)=>{
      this.category = items;
    this.points.clear();

      for (let index = 0; index < this.category.length; index++) {
        this.addPoints(this.category[index]);
      }
      
    })
  }
  adduserForm() {
    this.form = this.formbuilder.group({
      brandId: [null, [Validators.required]],
      points: this.formbuilder.array([
        this.formbuilder.group({
        pointNo:[1],
        categoryId:[null],
          name:[null],
          price: [null, [Validators.required,Validators.pattern(/^(?!0$)(0|[1-9]\d*)(\.\d+)?$/), Validators.max(0.5)]],
        }),
      ]),

    });
  }
   get points() { 
      return this.form.get('points') as FormArray;
    }
    noOfPoints:number = 1
 addPoints(item:any) {

    this.points.push(
      this.formbuilder.group({
        pointNo:[1],
        categoryId:[item.id],
        name:[item.name],
        price: [item.points!=null? item.points.price:0, [Validators.required,Validators.pattern(/^(?!0$)(0|[1-9]\d*)(\.\d+)?$/), Validators.max(0.5)]],
      })
    );
    this.noOfPoints = this.noOfPoints + 1

  }

  public submit() {
    this.isValidFormSubmitted = false;
    this.form.get('brandId')?.enable()
    this.form.patchValue({

      brandId : +this.form.get('brandId')?.value,
    })

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
      this.spinner.show();
      
        this.redeemService
          .addredeemPoints(this.form.value)
          .pipe(first())
          .subscribe({
            next: (user) => {
              this.spinner.hide();
              this.toastr.success(this.translate.instant('users.addSuccess'));


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
