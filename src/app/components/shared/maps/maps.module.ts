import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps.component';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [MapsComponent],
  imports: [CommonModule, HttpClientModule, LeafletModule],
  exports: [MapsComponent],
})
export class MapsModule {}
