import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RedeemPointsService } from 'src/app/services/api/redeem-points.service';

@Component({
  selector: 'app-redeem-points-cashier',
  templateUrl: './redeem-points-cashier.component.html',
  styleUrls: ['./redeem-points-cashier.component.scss'],
})
export class RedeemPointsCashierComponent implements OnInit {
  @Input() pointNo: number;
  @Input() brandId: any;
  @Input() id: any;
  @Input() branchId: any;

  pointsData: any;
  constructor(
    private _redeemPointsService: RedeemPointsService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}
  points: any;
  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.spinner.show();
    let paylod = {
      carId: this.id,
      brandId: this.brandId,
    };
    this._redeemPointsService.viewPointsDetails(paylod).subscribe((res) => {
      this.spinner.hide();
      this.pointsData = res;
      this.points = res.points;
    });
  }
  closeModal() {
    this.modalService.dismissAll('Cross click');
    this.router.navigate(['/admin/user-management']);
  }
  choosenPrice: any | null = null;
  afterPrice: any;
  pointId: string | null = null;
  pointInput: any;
  choosenPoints: any | null = null;
  validateInput(event: KeyboardEvent): void {
    const char = event.key;
    const englishNumbers = /^[0-9]*$/; // Only numbers (0-9)

    if (!englishNumbers.test(char)) {
      event.preventDefault(); // Prevent input
    }
  }

  blockEvent(event: ClipboardEvent | DragEvent): void {
    event.preventDefault(); // Block copy, paste, and drop
  }
  calcuatePoints() {
    if (this.pointInput != 0 && this.pointInput != null) {
      if (this.pointInput > this.pointNo) {
        this.toastr.error(this.translate.instant('pointsDetails.erroeSuccess'));
        this.choosenPoints = null;
        this.choosenPrice = null;
        this.pointInput = null;
        this.afterPrice = null;
      } else {
        this._redeemPointsService
          .ChangePoints(this.pointInput, this.id, this.branchId)
          .subscribe((res) => {
            this.choosenPrice = res;
          });
        this.afterPrice = this.pointNo - this.pointInput;
      }
    } else {
      this.choosenPoints = null;
      this.choosenPrice = null;
      this.pointInput = null;
      this.afterPrice = null;
    }
  }
  choosePoints(pointId: string) {
    this.pointId = pointId;
    this.errorMessage = null;
    if (pointId == null) {
      this.choosenPoints = null;
    }
    const pointchoosen = this.points.find((p: any) => p.id === Number(pointId));
    this.choosenPrice = pointchoosen?.price;
    this.choosenPoints = pointchoosen.pointNo;
    if (this.pointNo < this.choosenPoints) {
      this.toastr.error(this.translate.instant('pointsDetails.erroeSuccess'));
      this.choosenPoints = null;
      this.choosenPrice = null;
      this.pointId = null;
    } else {
      // this.afterPrice = this.pointNo - pointchoosen.pointNo
    }
  }
  errorMessage: string | null = null;
  submit() {
    if (this.pointInput === null && this.pointInput == 0) {
      this.errorMessage = this.translate.instant('pointsDetails.errorMessage');
    } else {
      let paylod = {
        pointNo: this.pointInput,
        carId: this.id,
        branchId: this.branchId,
      };

      this._redeemPointsService.savePointsExchange(paylod).subscribe({
        next: (next) => {
          this.spinner.hide();

          this.toastr.success(
            this.translate.instant('pointsDetails.addSuccess')
          );
          this.closeModal();
        },
        error: (err) => {
          this.spinner.hide();
          this.toastr.error(err.error.error.message);
        },
      });
    }
  }
}
