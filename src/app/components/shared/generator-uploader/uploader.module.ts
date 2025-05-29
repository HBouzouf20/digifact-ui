import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { UploaderComponent } from './uploader.component';

@NgModule({
  imports: [CommonModule, ToastModule, FileUploadModule],
  declarations: [UploaderComponent],
  exports: [UploaderComponent],
})
export class UploaderModule {}
