import { Card } from "../card"

export class CardResponse {
    success?: true
    deck_id?: string
    cards!: Card[]
    remaining?: 50
}