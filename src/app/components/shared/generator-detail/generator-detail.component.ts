import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'generator-detail',
  templateUrl: './generator-detail.component.html',
  styleUrls: ['./generator-detail.component.scss'],
})
export class GeneratorDetailComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataRow']) {
      let data = changes['dataRow'].currentValue;
      //delete data.id;
      this.dataRow = Object.entries(data).filter(
        (element: any) => element[1] !== '' && element[0] !== 'id',
      );
    }
  }

  @Input()
  name = '';

  @Input()
  dataRow?: any;

  objectEntries(obj: any): any {
    return Object.entries(obj);
  }
}
