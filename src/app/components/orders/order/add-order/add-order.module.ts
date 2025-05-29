import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { EquipmentDetailModule } from 'src/app/components/equipments/equipment-detail/equipment-detail.module';
import { GeneratorFormModule } from 'src/app/components/shared/generator-form/generator-form.module';
import { AddOrderComponent } from './add-order.component';
import { ButtonModule } from 'primeng/button';
import { ToggleButton, ToggleButtonModule } from 'primeng/togglebutton';
import { Ripple } from 'primeng/ripple';

@NgModule({
declarations: [AddOrderComponent],
  imports: [
  CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    GeneratorFormModule,
    CalendarModule,
    DynamicDialogModule,
    EquipmentDetailModule,
    ReactiveFormsModule,
    ButtonModule,
    ToggleButtonModule,
    Ripple

  ],
  exports : [AddOrderComponent]
})
export class AddOrderModule {
}
