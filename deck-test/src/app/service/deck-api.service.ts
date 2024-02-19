import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class DeckService {
    constructor(private http: HttpClient) {}
    env = environment;

    async shuffleDeck(value?: any) {
        return this.http
                .get(this.env.api + `new/shuffle/?deck_count=${value}`)
                .toPromise()
                .then((response) => { return response });
    }

    async shuffleDeckReset(value?: any) {
        return this.http
                .get<any>(this.env.api + `${value}/shuffle` )
                .toPromise()
                .then((response) => { return response });
    }

    async buyCard(deck?: any, qty?: any) {
        return this.http
                .get(this.env.api + `${deck}/draw/?count=${qty}` )
                .toPromise()
                .then((response) => { return response });
    }
}
