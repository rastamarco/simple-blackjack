import { Injectable } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

//Models
import { GlobalConfigs } from "./global-configs";

@Injectable({
    providedIn: TranslateModule    
})
export class TranslateCommon {
    private config = new GlobalConfigs();

    constructor (public translateService: TranslateService) {
        this.translateService.addLangs(this.config.getConfig().languages)
        this.setLanguage();
    }

    //DEFINE A LINGUAGEM SELECIONADA E PADRÃO
    public setLanguage(language?: any) {
        if (!language) {
            let lang = localStorage.getItem('language');
            
            if (!lang) {
                this.translateService.setDefaultLang('en');
                return;
            }

            this.translateService.setDefaultLang(lang);
            return;

        }

        this.translateService.setDefaultLang(language);
    }

    // UMA ABORDAGEM ASYNCRONA PARA TRADUCOES NÃO É BOA, SE TORNA UMA PROMISE
    // PELO TEMPO E PELA VERSÃO, MANTIVE ASSIM 
    async i18N(key: string) {
        return this.translateService.get(key).toPromise().then( resp => {
            return resp
        });
    }
}