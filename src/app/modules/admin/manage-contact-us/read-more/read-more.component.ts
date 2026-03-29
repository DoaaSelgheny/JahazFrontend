import { Component, EventEmitter, Input ,Output} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
})


export class ReadMoreComponent {
      @Output() passEntry: EventEmitter<any> = new EventEmitter();
  
@Input() data: any;

  constructor(    public activeModal: NgbActiveModal,) {
    
  }


}
