import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return ''; // Handle null or empty values

    const parsedDate = new Date(value);
    console.log('Parsed Date:', parsedDate)
    const formattedDate = parsedDate.toLocaleTimeString ('en-US', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    console.log('Formated Date:', formattedDate)

    return formattedDate;
  }
  
}
