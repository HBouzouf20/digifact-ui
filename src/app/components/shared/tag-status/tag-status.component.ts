import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag-status',
  templateUrl: './tag-status.component.html',
  styleUrl: './tag-status.component.scss'
})
export class TagStatusComponent {

    @Input()
    value: any;

    @Input()
    severity: any;

    getTagSeverity() {
        switch (this.value) {
            case 'PAYED': case 'Payed':
                return 'success';
            case 'Pending':
                return 'warning';
            case 'Repared' : case 'ROLE_ADMIN' :
                return 'info';
            case 'Canceled' :
                return 'contrast';
            case 'NOT_PAYED':case 'Not payed': case 'out-of-stock': case 'NOT_PAYED': case 'unknown': case 'Disabled' :
                return 'danger';

        }

        return 'success';
    }

    getValue() {
        switch (this.value) {
            case 'PAYED':
                return 'Payed';
            case 'NOT_PAYED':
                return 'Not payed';
        }

        return this.value;
    }

}
