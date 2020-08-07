import { Component } from '@angular/core';
import { GebruikerService } from './services/gebruiker.service';
import { Gebruiker } from './models/gebruiker.model';
import { ItemService } from './services/item.service';
import { StemService } from './services/stem.service';
import { LijstService } from './services/lijst.service';
import { Item } from './models/item.model';
import { Router } from '@angular/router'
import { toBase64String } from '@angular/compiler/src/output/source_map';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angulartaak';

  loggedIn = false

  selectedFile: ImageSnippet;
  gebruikers: Gebruiker[] = [];
  gebruiker: Gebruiker;
  gebruikersId = 1;
  item: Item;
  fotoValidate = false;

  constructor(private gebruikerService: GebruikerService, private lijstService: LijstService, private stemService: StemService, private itemService: ItemService
    , private router: Router) {

  }

  ngOnInit() {

    this.gebruikerService.loggedIn.next(localStorage.getItem('gebruikerId') ? true : false);
    this.gebruikerService.loggedIn.subscribe(i => {
      console
      this.loggedIn = i;
    })
  }

  logout() {
    localStorage.removeItem('gebruikerId');
    this.gebruikerService.logout(false);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigateByUrl('');
  }
}
