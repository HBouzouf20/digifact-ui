import { EquipmentDetailComponent } from './equipment-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [EquipmentDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    TranslateModule
  ],
  exports: [
    EquipmentDetailComponent

  ]
})
export class EquipmentDetailModule { }
