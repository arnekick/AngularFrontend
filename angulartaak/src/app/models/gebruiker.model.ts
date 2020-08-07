import { Item } from './item.model';
import { Lijst } from './lijst.model';
import { Stem } from './stem.model';

export class Gebruiker {
    gebruikerID: number;
    email: string;
    wachtwoord: string;
    gebruikersnaam: string;

    stemmen: Stem[];
}
