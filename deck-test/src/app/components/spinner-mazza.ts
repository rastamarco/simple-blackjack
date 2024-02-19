import { Component, OnInit } from '@angular/core';

//Static and Globals
import { TranslateCommon } from './../commom/translate-commom';

@Component({
  selector: 'loading-mazza',
  templateUrl: './spinner-mazza.html',
  styleUrls: ['./spinner-mazza.scss']
})
export class SpinnerMazzaComponent implements OnInit {
    loadingText: string | undefined

    constructor(public translate: TranslateCommon) {
        this.ngOnInit()
    }
    
    async ngOnInit() {
        this.loadingText = await this.translate.i18N('COMPONENTS.LOADING')
    }
}