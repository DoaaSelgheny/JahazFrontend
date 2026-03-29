import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateDifference',
  standalone: true,
})
export class DateDifferencePipe implements PipeTransform {
  constructor() {}
  transform(value: string): any {
    let myDate = new Date(value);
    // var newDate = new Date(
    //   myDate.getTime() - myDate.getTimezoneOffset() * 60 * 1000
    // );
    return myDate;
   
  }
}
