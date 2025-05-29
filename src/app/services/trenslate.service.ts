
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

import { Observable } from 'rxjs';
import { take,tap } from 'rxjs/operators';
export interface Locale {
    lang: string;
    data: any;
}

const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';
@Injectable({
    providedIn: 'any',
})
export class TranslationService {

    constructor(private translate: TranslateService, private httpClient: HttpClient,private config: PrimeNGConfig) {
        // add new langIds to the list
        translate.addLangs(['fr', 'ar', 'en']);

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
        this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));


        const selectedLang = this.getSelectedLanguage();

        this.translate.use(selectedLang);
    }


    setUserLang(payload:any):Observable<any>{
        return this.httpClient.post('api/translation/set',payload)
    }
    setLanguage(lang:string){

        this.translate.use(lang)
        localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, lang);
    }
    setUserLanguage(lang: string) {
        // console.log('select language',lang)

        this.setUserLang({lang: lang}).pipe(
            take(1),
            tap(()=> {
                this.translate.use(lang)
                localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, lang);
                if(lang === "ar") {
                    document.getElementById('#root')?.setAttribute("dir","rtl");
                } else {
                    document.getElementById('#root')?.setAttribute("dir","");
                }


            })
        ).pipe(take(1)).subscribe();
    }

    /**
     * Returns selected language
     */
    getSelectedLanguage(): string {
        // Get language from local storage or browser default
        let selectedLang = localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY) || navigator.language.split('-')[0];
        // If the language is not in the translate service's list, use the default
        if (!this.translate.getLangs().includes(selectedLang)) {
            selectedLang = this.translate.getDefaultLang();
        }
        // console.log(navigator.language.split('-')[0]);
        return selectedLang;
    }
}
