import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManageRequestsService } from 'src/app/services/api/manage-requests.service';

@Component({
  selector: 'app-truck-images',
  templateUrl: './truck-images.component.html',
  styleUrls: ['./truck-images.component.scss']
})
export class TruckImagesComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
        private manageRequestsService: ManageRequestsService,
            private spinner: NgxSpinnerService,
                private translate: TranslateService,



  ) {}

  @Input() data: any =''



  selectedIndex = 0;

images: any[] = [];
getTruckImage()
{
    this.spinner.show()
  this.manageRequestsService.getTruckImage(this.data.carNumber).subscribe((res)=>{

        this.images = res.visits || [];

   if (this.images.length > 0) {
      this.selectedIndex = 0;
    }
    this.spinner.hide()

  })
}
select(index: number) {
  this.selectedIndex = index;
}

next() {
  if (!this.images.length) return;

  this.selectedIndex =
    (this.selectedIndex + 1) % this.images.length;
}

prev() {
  if (!this.images.length) return;

  this.selectedIndex =
    (this.selectedIndex - 1 + this.images.length) % this.images.length;
}

  ngOnInit(): void {
    this.getTruckImage()

  }


}
