import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AppModuleComponents } from './commom/modules/components.module';
import { AppModuleNgComponents } from './commom/modules/ng-component.module';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppModuleNgComponents,
    AppModuleComponents,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  exports: [
    AppModuleComponents
  ],
  providers: [
    HttpClientModule,
    TranslateService,
    FormBuilder
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
