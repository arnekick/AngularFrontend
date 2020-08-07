import { Item } from './item.model';
import { Gebruiker } from './gebruiker.model';

export class Lijst {
    lijstID: number;
    naam: string;
    beschrijving: string;
    actief: boolean;
    eigenaar: Gebruiker;

    items: Item[];
}
