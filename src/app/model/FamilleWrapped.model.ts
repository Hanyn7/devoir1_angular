import { Famille } from "./famille.model";

export class FamilleWrapper{
_embedded!: { familles: Famille[]};
}