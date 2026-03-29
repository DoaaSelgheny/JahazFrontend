import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationRead } from 'src/app/services/enums/notification.enum';
import { ManagerService } from 'src/app/services/api/manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-management',
  templateUrl: './dashboard-management.component.html',
  styleUrls: ['./dashboard-management.component.scss'],
})
// AdsService
export class DashboardManagementComponent implements OnInit {
  allBranch: any[] = [];
  camerNo: any;
  branchNo: any;
  brandNo: any;
  constructor(
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private managerService: ManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.spinner.show();
    this.managerService
      .getLastBranch({
        Sorting: 'id',
        SkipCount: 0,
        MaxResultCount: 6,
      })
      .subscribe((res) => {
        this.allBranch = res.items;

        this.managerService.getChart().subscribe((res) => {
          this.branchNo = res.branchNo;
          this.brandNo = res.brandNo;
          this.camerNo = res.cameraNo;
          this.spinner.hide();
          this.cdr.detectChanges();
        });
      });
  }
  goToBranch() {
    this.router.navigate(['admin/branches-management']);
  }
}
