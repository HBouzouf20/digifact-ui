import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {ToastService} from "../../layout/toast.service";

@Component({
    selector: 'app-barcode-scanner',
    templateUrl: './barcode-scanner.component.html',
    styleUrl: './barcode-scanner.component.scss'
})
export class BarcodeScannerComponent {
    combinedCode = '';

    constructor( private router: Router, private toast: ToastService) {
    }

    @HostListener('document:keydown', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            if(this.combinedCode)
           /* this.repairService.getRepairByReference(this.combinedCode).subscribe({
                next:(result: any) => {this.router.navigate(['/repairs/info'], {queryParams: {id: result.reference}})},
                error: (error: any) => {
                    this.toast.showError(`Reference ${this.combinedCode} not found`)
                    console.log(error)
                    this.combinedCode = '';
                }
            })*/

            this.combinedCode = '';
        } else {
            this.combinedCode += event.key;
        }
    }

}
