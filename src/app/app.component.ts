import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    DEFAULT_LANG = 'ar';
    constructor(private primengConfig: PrimeNGConfig, private translateService: TranslateService) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        const lang = localStorage.getItem('language')
        if(lang) {
            this.translateService.setDefaultLang(lang);
        } else {
            this.translateService.setDefaultLang(this.DEFAULT_LANG);
        }

    }

}
