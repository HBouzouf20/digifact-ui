import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function TranslateHttpLoader(http: HttpClient): CustomTranslateHttpLoader {

    return new CustomTranslateHttpLoader(http, [
        { prefix: './assets/i18n/', suffix: '.json' }
    ]);
}

export class CustomTranslateHttpLoader implements TranslateLoader {

    constructor(private http: HttpClient,
                public resources: { prefix: string, suffix: string }[] = [{prefix: '/assets/i18n/', suffix: '.json'}]) { }

    /**
     * Gets the translations from the server
     * @param lang Platforem language
     * @return Return Observable
     */
    public getTranslation(lang: string): Observable<any> {


        return forkJoin(
            this.resources.map(config => {
                return this.http.get(`${config.prefix}${lang}${config.suffix}`);
            })
        ).pipe(
            map(response => {
                return response.reduce((a, b) => {
                    return Object.assign(a, b);
                });
            })
        );
    }
}
