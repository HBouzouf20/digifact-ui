import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorDetailComponent } from './generator-detail.component';
import { GeneratorDetailAttributeModule } from '../generator-attribute/generator-detail-attribute.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [GeneratorDetailComponent],
  imports: [CommonModule, GeneratorDetailAttributeModule, TranslateModule],
  exports: [GeneratorDetailComponent],
})
export class GeneratorDetailModule {}
