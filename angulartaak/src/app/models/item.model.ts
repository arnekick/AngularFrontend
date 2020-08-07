import { Stem } from './stem.model';
import { LijstService } from '../services/lijst.service';
import { Lijst } from './lijst.model';

export class Item {
    itemID: number;
    lijst: Lijst;
    naam: string;
    beschrijving: string;
    foto: string;

    stemmen: Stem[];
    gestemd: boolean;
}
