import { Component, DoCheck, OnInit } from '@angular/core';

//Static and Globals
import { GlobalConfigs } from './commom/global-configs';
import { TranslateCommon } from './commom/translate-commom';
import { LanguagesEnum } from './enums/enum-languages';

//Service
import { DeckService } from './service/deck-api.service';
import { DeckResponse } from './models/response/deck-response';
import { CardResponse } from './models/response/card-response';
import { Card } from './models/card';
import { CardSpecialEnum } from './enums/enum-card-special';
import { SwalAlert } from './commom/swal-alert';
import { AlertEnum } from './enums/enum-alert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  config = new GlobalConfigs().getConfig();
  languages: any[] = [];
  selectedLanguage: any;
  msg: any[] = [];
  severity: any;
  text: any;
  loading: boolean = false;
  btnLabel: string = '';
  btnLabelReset: string = '';
  btnLabelStop: string = '';
  startBlackJack: boolean = false;
  listCards: Card[] = [];
  listCardsTable: Card[] = [];
  cardQty: number = 0;
  totalValue: number = 0;
  blackJackValue: number = 21;
  totalTable: number =  0;
  userStop: boolean = false;
  cardsTable: any;
  userWin: boolean = false;

  constructor(public translate: TranslateCommon,
              public service: DeckService,
              public swal: SwalAlert) { }

  ngDoCheck() { }

  async ngOnInit() {
    this.msg = [];
    this.startBlackJack = false;
   
    this.config.languages.forEach(async lang => {
      let languageName = await this.getLanguagesNames(lang);
      this.languages.push({ name: languageName, code: lang });
    });
  }

  async getLanguagesNames(lang: string) {
    switch(lang) {
      case LanguagesEnum.PT: 
        return await this.translate.i18N('PT');
      case LanguagesEnum.EN:
        return await this.translate.i18N('EN');
      case LanguagesEnum.ES:
        return await this.translate.i18N('ES');
      default:
        return 'en';
    }
  }

  async selectLanguage(event: any) {
    this.translate.setLanguage(event.value);
    localStorage.setItem('language', event.value);

    this.btnLabel = await this.translate.i18N('COMPONENTS.GIVE_CARD');
    this.btnLabelReset = await this.translate.i18N('RESTART');
    this.btnLabelStop = await this.translate.i18N('STOP_GAME')
  }

  async play() {
    this.loading = true;
    await this.service.shuffleDeck(2)
          .then( async (response: any) =>{
            let deckResponse = new DeckResponse();
            deckResponse = { ...response };
            
            if (!deckResponse.success) {
              console.log('error');
              return ;
            }
            
            localStorage.setItem("deck", deckResponse.deck_id);
          }).catch( error => console.log(error))

    this.btnLabel = await this.translate.i18N('COMPONENTS.GIVE_CARD');
    this.btnLabelReset = await this.translate.i18N('RESTART');
    this.btnLabelStop = await this.translate.i18N('STOP_GAME');
    this.loading = false;
    this.startBlackJack = true
  }

  async giveCard() {
    this.loading = true;
    let qtty = this.cardQty === 0 ? 2 : 1;
    await this.service.buyCard(localStorage.getItem("deck"), qtty)
      .then( async (response: any) => {
          let cards = new CardResponse();
          cards = { ...response };

          this.fillListCard(cards.cards);
      }).catch( error => console.log(error))
    
    this.cardQty = this.cardQty === 0 ? 2 : this.cardQty++;
    this.loading = false;
  }

  fillListCard(listCards: Card[]) {
    let value: number = 0;
    listCards.forEach(card => {
      this.listCards.push(card);
    });

    this.listCards.forEach(card => {
      if (card.value === CardSpecialEnum.King || card.value === CardSpecialEnum.Jack || 
          card.value === CardSpecialEnum.Queen || card.value === CardSpecialEnum.Ace)
        value += 10;
      else
        value += parseInt(card.value)
    });

    this.totalValue = value;
  }

 tableGame(listCards: Card[]) {
    let value: number = 0;
    listCards.forEach(card => {
      this.listCardsTable.push(card);
    });

    this.listCardsTable.forEach(card => {
      if (card.value === CardSpecialEnum.King || card.value === CardSpecialEnum.Jack || 
          card.value === CardSpecialEnum.Queen || card.value === CardSpecialEnum.Ace)
        value += 10;
      else
        value += parseInt(card.value)
    });

    this.totalTable = value;
  }

  async parar() {
    this.userStop = true;
    await this.getTableValues();

    this.cardsTable = this.listCardsTable.map(x => x.value).join("-");
    let userWin = this.getResult()

    if (!userWin) {
      //A abordagem da tradução voltando como Promise tira deixa o código dessa forma
      //se não fosse a Promise poderia ter sido em uma linha só, veja a baixo: 
      //this.swal.showAlert(AlertEnum.error, this.translate.i18N('LOSE'), this.translate.i18N('NOT_TIME'));
      let message = await this.translate.i18N('LOSE');
      let shortMessage = await this.translate.i18N('NOT_TIME');
      this.swal.showAlert(AlertEnum.error, message, shortMessage);
      return;
    }

    if (userWin) {
      let message = await this.translate.i18N('WIN');
      let shortMessage = await this.translate.i18N('CONGRATULATIONS');
      this.swal.showAlert(AlertEnum.success, message, shortMessage);
      return;
    }
  }

  async getTableValues() {
    while(this.totalTable < this.totalValue) {
      await this.service.buyCard(localStorage.getItem("deck"), 1)
      .then( async (response: any) => {
          let cards = new CardResponse();
          cards = { ...response };

          this.tableGame(cards.cards);
      }).catch( error => console.log(error))
    }
  }

  getResult() {
    if (this.totalValue <= this.blackJackValue && this.totalTable > this.blackJackValue)
      return true;

    if (this.totalTable > this.totalValue)
      return false;

    return false;
  }

  reset() {
    this.totalValue = 0;
    this.listCards = []
    this.cardQty = 0;
    this.startBlackJack = false;
    this.userStop = false;
    this.totalTable = 0;
    this.listCardsTable = [];
    this.userWin = false;
  }
}
