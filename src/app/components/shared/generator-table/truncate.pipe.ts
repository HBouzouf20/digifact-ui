import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
    name: 'truncate',
    standalone: true // This is optional if you're using Angular 14+ and standalone pipes
})
export class TruncatePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(value: string, limit: number): any {
        if (!value) return '';

        // Check if value contains HTML tags using a regular expression
        const isHtml = /<[a-z][\s\S]*>/i.test(value);

        if (isHtml) {
            // If the content contains HTML, return it as a trusted HTML (sanitized)
            return this.sanitizer.bypassSecurityTrustHtml(value);
        } else {
            // If it's plain text, apply truncation
            return value.length > limit ? value.substring(0, limit) + '...' : value;
        }
    }
}
