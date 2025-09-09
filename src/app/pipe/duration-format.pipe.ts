import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormat'
})
export class DurationFormatPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    if (!value) return '';

    // Example input: "PT3H40M", "PT5M", "PT1H10M"
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/;
    const match = regex.exec(value);

    if (!match) return value; // return original if not parsable

    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  }

}
