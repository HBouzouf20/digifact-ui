import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    @ViewChild('menuButton') menuButton!: ElementRef;

    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef;

    constructor(public layoutService: LayoutService, public el: ElementRef, private translateService:TranslateService) {
        this.countries = [
            { name: 'Arabe', code: 'MA',value:"ar" },
            { name: 'Francais', code: 'fr', value:"fr" },
            { name: 'English', code: 'US', value:"en" }
        ];
    }

    countries: any[];

    selectedCountry: any;
    activeItem!: number;

    get mobileTopbarActive(): boolean {
        return this.layoutService.state.topbarMenuActive;
    }

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }


    onMobileTopbarMenuButtonClick() {
        this.layoutService.onTopbarMenuToggle();
    }
    selectLang(lang:any){
        this.selectedCountry = lang
        this.translateService.use(lang.value)
        localStorage.setItem('language',lang.value)
        window.location.reload()

    }
}
