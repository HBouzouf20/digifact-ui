import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarcodeComponent } from '../barcode/barcode.component';
import { BarcodeScannerComponent } from './barcode-scanner.component';



@NgModule({
  declarations: [BarcodeScannerComponent],
  imports: [
    CommonModule,
  ],
  exports : [BarcodeScannerComponent]
})
export class BarCodeModule { }
