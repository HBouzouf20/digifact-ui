import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrinterComponent } from './printer.component';



@NgModule({
  declarations: [PrinterComponent],
  imports: [
    CommonModule,
  ],
  exports : [PrinterComponent]
})
export class PrinterModule { }
