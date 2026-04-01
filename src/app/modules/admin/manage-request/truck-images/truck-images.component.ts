import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-truck-images',
  templateUrl: './truck-images.component.html',
  styleUrls: ['./truck-images.component.scss']
})
export class TruckImagesComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }



  selectedIndex = 0;

images = [
  {
    url: '../../../../../assets/imgs/Surface.png',
    label: 'Entry Photo'
  },
  {
    url: '../../../../../assets/imgs/textandimgAR.png',
    label: 'During Filling'
  },
  {
    url: '../../../../../assets/imgs/textandimgEn6.png',
    label: 'During Filling'
  }
];

select(index: number) {
  this.selectedIndex = index;
}

next() {
  this.selectedIndex =
    (this.selectedIndex + 1) % this.images.length;
}

prev() {
  this.selectedIndex =
    (this.selectedIndex - 1 + this.images.length) %
    this.images.length;
}
}
