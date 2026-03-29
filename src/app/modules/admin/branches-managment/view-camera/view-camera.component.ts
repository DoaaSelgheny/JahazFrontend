import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchesService } from 'src/app/services/api/branches.service';

@Component({
  selector: 'app-view-camera',
  templateUrl: './view-camera.component.html',
  styleUrls: ['./view-camera.component.scss'],
})
export class ViewCameraComponent implements OnInit {
  @Input() id: any;
  @Input() brandname: any;
  cameras: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private branchesService: BranchesService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {

    this.branchesService.manageCamera(this.id).subscribe((res) => {
      this.cameras = res;
    });
  }

  closeModal() {
    this.modalService.dismissAll('Cross click');
  }
}
