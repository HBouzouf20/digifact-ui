import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import JsBarcode from 'jsbarcode';
import {Logger} from "concurrently/index";

@Component({
  selector: 'app-printer',
  templateUrl: './printer.component.html',
  styleUrl: './printer.component.scss'
})
export class PrinterComponent implements OnChanges{
    ngOnChanges(changes: SimpleChanges) {
        if (changes['ticket'] && this.ticket) {
            this.generateBarcode(this.ticket.code);
        }
    }

    date = Date.now()

    @ViewChild('barcode', {static: true}) barcodeElement:
        | ElementRef
        | undefined;

    @Input()
    ticket = {
        code: '123456',
        clientName: 'HAMZA Bouzouf',
        phone: '0493230948',
        price: '450.00 DH',
        issues: ['']
      };

       generateBarcode(reference: string): void {
                  if (reference && this.barcodeElement) {
                      JsBarcode(this.barcodeElement.nativeElement, reference, {
                          format: 'CODE128',
                          lineColor: 'black',
                          width: 1,
                          height: 20,
                          displayValue: false,
                      });
                  }
              }


    protected readonly Date = Date;
}
