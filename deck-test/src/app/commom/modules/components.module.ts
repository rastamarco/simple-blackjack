import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { SpinnerMazzaComponent } from '@app/components/spinner-mazza';
import { AppModuleNgComponents } from './ng-component.module';

@NgModule({
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      CommonModule,
      FormsModule,
      AppModuleNgComponents
    ],
    declarations: [
        SpinnerMazzaComponent
    ],
    exports: [
        SpinnerMazzaComponent
    ],
})
export class AppModuleComponents { }