import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'mjdateFormat' })
export class MomentPipe implements PipeTransform {
    transform(value: any | moment.Moment, mjdateFormat: string): any {
        //---Note I use the slice to remove the timezone -------//
        let newDate = moment(value.slice(0,-14)).format(mjdateFormat);
        //console.log(newDate);
        return newDate;
        //return moment(value).format(mjdateFormat);
    }
}