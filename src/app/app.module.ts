import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppLayoutModule} from './layout/app.layout.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessageService} from 'primeng/api';
import {DialogService, DynamicDialogConfig} from 'primeng/dynamicdialog';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {JwtInterceptor} from './interceptors/JwtInterceptor/jwt-interceptor';
import {AuthService} from './services/auth.service';
import {TokenService} from './services/token.service';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {BarcodeComponent} from "./components/barcode/barcode.component";
import { BarCodeModule } from './components/barcode-scanner/barcode-scanner.module';


export function HttpLoaderFactory(http: HttpClient) {
    const loader = new TranslateHttpLoader(http);
    return loader;
}

@NgModule({
    declarations: [
        AppComponent,
        BarcodeComponent
    ],
    imports: [
        BrowserAnimationsModule,
        LeafletModule,
        AppRoutingModule,
        AppLayoutModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            extend: true
        }),
        FormsModule,
        BarCodeModule

    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        AuthService,
        TokenService,
        MessageService,
        DialogService,
        DynamicDialogConfig
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
