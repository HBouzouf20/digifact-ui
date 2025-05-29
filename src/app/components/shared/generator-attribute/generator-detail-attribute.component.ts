import { Component, Input } from '@angular/core';

@Component({
  selector: 'generator-detail-attribute',
  templateUrl: './generator-detail-attribute.component.html',
  styleUrls: ['./generator-detail-attribute.component.scss'],
})
export class GeneratorDetailAttributeComponent {
  @Input()
  title = '';

  @Input()
  value = '';
}
