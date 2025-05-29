import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import JsBarcode from 'jsbarcode';

@Component({
    selector: 'app-barcode',
    templateUrl: './barcode.component.html',
    styleUrls: ['./barcode.component.scss']
})
export class BarcodeComponent implements OnInit {
    @ViewChild('barcode', { static: true }) barcodeElement: ElementRef | undefined;
    text: string = '1234567890'; // Default text for barcode

    constructor() { }

    ngOnInit(): void {
        this.generateBarcode();
    }

    generateBarcode(): void {
        if (this.barcodeElement) {
            JsBarcode(this.barcodeElement.nativeElement, this.text, {
                format: "CODE128",  // Barcode format (CODE128, EAN13, etc.)
                lineColor: "#0aa",  // Barcode color
                width: 2,           // Width of the bars
                height: 100,        // Height of the barcode
                displayValue: true  // Display the text below the barcode
            });
        }
    }

    // Method to update barcode text dynamically
    updateText(newText: string): void {
        this.text = newText;
        this.generateBarcode();
    }
}
