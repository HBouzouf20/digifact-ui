import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {
  MODEL_CONFIG,
  SharedService,
} from 'src/app/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private dataService: SharedService) {}

  /**
   * Gets the data for a specific model.
   * @param modelName The name of the model (e.g., 'brand', 'category', 'family')
   * @returns Observable with data array for the model
   */
  getDropdownData(modelName: string): Observable<any[]> {
    const endpoint = MODEL_CONFIG[modelName];
    if (!endpoint) {
      throw new Error(`No endpoint configured for model: ${modelName}`);
    }
    return this.dataService.fetchData(endpoint);
  }
}
