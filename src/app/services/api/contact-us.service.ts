import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private webApi: WebApiService) {}

  getAllMessage(param?: any) {
    
    return this.webApi.get('api/app/manage-contact-us/contact-us', param);
  }


  sendReply(replyData: any)
  {
    return this.webApi.post('api/app/manage-contact-us/reply-to-contact-us-message',replyData)
  }

  status(status: any)
  {
    return this.webApi.post('api/app/manage-contact-us/change-contact-us-status',status)
  }
  

  GetAllData(obj?:any)
  {
    return this.webApi.get('api/app/manage-contact-us/contact-us',obj);
  }
  setComplain(body: any) {
    return this.webApi.post(
      'api/app/manage-contact-us/set-complaint-type',
      body
    );
  }

  sendContactUsMessage(obj: any) {
    return this.webApi.post(`api/app/manage-contact-us/contact-us`, obj);
  }

  sendContactUsReply(obj: any) {
    return this.webApi.post(`api/app/manage-contact-us/reply`, obj);
  }

  addContactUs(body:any)
  {
    return this.webApi.post(`api/app/manage-contact-us/contact-us`, body);
  }
  // addClassification(classificationObj: any) {
  //   return this.webApi.post(
  //     '/api/app/manage-classification',
  //     classificationObj
  //   );
  // }
}
