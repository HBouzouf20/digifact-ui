/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProgressBarModule} from 'primeng/progressbar';
import {AppMenuComponent} from "./layout/app.menu.component";
import {AppFooterComponent} from "./layout/app.footer.component";
import {MenuService} from "./layout/app.menu.service";

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule, ProgressBarModule ],
            declarations: [ AppComponent,
                AppMenuComponent,
                AppFooterComponent
            ],
            providers: [MenuService]
        });
        TestBed.compileComponents();
    });

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
