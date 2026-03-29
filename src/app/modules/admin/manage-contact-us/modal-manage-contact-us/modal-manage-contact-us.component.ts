import {  Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactUsService } from 'src/app/services/api/contact-us.service';
@Component({
  selector: 'app-modal-manage-contact-us',
  templateUrl: './modal-manage-contact-us.component.html',
  styleUrls: ['./modal-manage-contact-us.component.scss'],
})
export class ModalManageContactUsComponent implements OnInit {


  ReplayMessage:FormGroup
    @Output() passEntry: EventEmitter<any> = new EventEmitter();
    @Input() data: any;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder:FormBuilder,
    private contactUsService:ContactUsService

  ) {}

  ngOnInit(): void {
    this.initForm();
    this.ReplayMessage.get('id')?.setValue(this.data.id);
  }

  initForm() {
    this.ReplayMessage = this.formBuilder.group({
      contactUsId: [],
      reply: [' ', [Validators.required]],
    });
  }




  sendform() {
    const replyData = {
      contactUsId: this.data.id, 
      message: this.ReplayMessage.get('reply')?.value
    };
  
    this.contactUsService.sendReply(replyData).subscribe({
      next: (res) => {
        this.activeModal.close();
        window.location.reload();
      },

    });
  }
  

  close()
  {
    this.activeModal.close()
  }
}
