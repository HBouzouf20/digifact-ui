import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorDetailAttributeComponent } from './generator-detail-attribute.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [GeneratorDetailAttributeComponent],
  imports: [CommonModule, TranslateModule],
  exports: [GeneratorDetailAttributeComponent],
})
export class GeneratorDetailAttributeModule {}
