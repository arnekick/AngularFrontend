import { Component, OnInit } from '@angular/core';
import { GebruikerService } from '../services/gebruiker.service';
import { Lijst } from '../models/lijst.model';
import { LijstService } from '../services/lijst.service';
import { Gebruiker } from '../models/gebruiker.model';
import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { StemService } from '../services/stem.service';
import { Stem } from '../models/stem.model';
import { Router, ActivatedRoute } from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedFile: ImageSnippet;
  gebruiker: Gebruiker;
  lijsten: Lijst[] = [];
  naam: string;
  beschrijving: string;
  fotoValidate = true;
  mijnLijst = true;
  melding = false;
  meldingS = "Vul al de velden in!";

  titel: string = "Mijn Lijsten";

  constructor(private gebruikerService: GebruikerService, private lijstService: LijstService, private itemService: ItemService, private stemService: StemService, private router: Router, private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.paramMap.subscribe(params => {
      this.ngOnInit();
    });
  }

  ngOnInit() {
    this.gebruikerService.get(Number(localStorage.getItem('gebruikerId'))).subscribe(gebruiker => {
      this.gebruiker = gebruiker;
      console.log(this.gebruiker)
    })

    this.getLijsten();
  }

  getLijsten() {
    this.mijnLijst = true;
    this.lijstService.GetByGebruiker(Number(localStorage.getItem('gebruikerId'))).subscribe(lijsten => {
      this.lijsten = lijsten;
      this.lijsten.forEach(lijst => {
        this.itemService.GetItemsWhereLijst(lijst.lijstID).subscribe(items => {
          lijst.items = items;
          lijst.items.forEach(item => {
            this.stemService.getAllWhereItemId(item.itemID).subscribe(stemmen => {
              item.stemmen = stemmen;

              item.gestemd = false;
              for (var i = 0; i < item.stemmen.length; i++) {
                if (item.stemmen[i].gebruiker.gebruikerID == this.gebruiker.gebruikerID) {
                  item.gestemd = true;
                  break;
                }
              }

            })
          })
        })
      });
    })

    this.titel = "Mijn Lijsten";
  }

  nieuwItem(lijst, imageInput) {
    if (this.naam != null && this.beschrijving != null && imageInput.files[0] != null && this.naam != "" && this.beschrijving != "" && imageInput.files[0] != "") {
      this.melding = false;
      let item = new Item();
      item.lijst = lijst;
      item.naam = this.naam;
      item.beschrijving = this.beschrijving;

      const file: File = imageInput.files[0];
      const reader = new FileReader();

      reader.addEventListener('load', (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);

        console.log(this.selectedFile.src);
        console.log(this.selectedFile.src.length);

        if (this.selectedFile.src.length <= 80000) {
          this.fotoValidate = true;
          item.foto = this.selectedFile.src
          this.itemService.add(item).subscribe(() => {
            window.location.reload();
          });
        } else {
          this.fotoValidate = false;
        }
      })

      reader.readAsDataURL(file);
    }
    if (this.naam == null || this.beschrijving == null || imageInput.files[0] == null || this.naam == "" || this.beschrijving == "" || imageInput.files[0] == "") {
      this.melding = true;
      this.meldingS = "Vul al de velden in!";
    }
  }

  vote(item: Item) {
    if (item.lijst.actief == true) {
      let stem = new Stem();
      this.gebruikerService.get(Number(localStorage.getItem('gebruikerId'))).subscribe(gebruiker => {
        stem.item = item
        stem.gebruiker = gebruiker;
        this.stemService.GetExistence(stem.item.itemID, stem.gebruiker.gebruikerID).subscribe(existence => {
          if (existence == true) {
            this.stemService.GetExistenceStem(stem.item.itemID, stem.gebruiker.gebruikerID).subscribe(stem => {
              this.stemService.delete(stem.stemID).subscribe(() => {
                this.lijsten.forEach(lijst => {
                  lijst.items.forEach(item => {
                    this.stemService.getAllWhereItemId(item.itemID).subscribe(stemmen => {
                      item.stemmen = stemmen;

                      item.gestemd = false;
                      for (var i = 0; i < item.stemmen.length; i++) {
                        if (item.stemmen[i].gebruiker.gebruikerID == this.gebruiker.gebruikerID) {
                          item.gestemd = true;
                          break;
                        }
                      }
                    })
                  })
                })
              })
            })
          }
          if (existence == false) {
            this.stemService.add(stem).subscribe(() => {
              this.lijsten.forEach(lijst => {
                lijst.items.forEach(item => {
                  this.stemService.getAllWhereItemId(item.itemID).subscribe(stemmen => {
                    item.stemmen = stemmen;

                    item.gestemd = false;
                    for (var i = 0; i < item.stemmen.length; i++) {
                      if (item.stemmen[i].gebruiker.gebruikerID == this.gebruiker.gebruikerID) {
                        item.gestemd = true;
                        break;
                      }
                    }
                  })
                })
              })
            });
          }
        })
      })
    }
  }

  status(lijst: Lijst) {
    lijst.actief = !lijst.actief;
    this.lijstService.update(lijst.lijstID, lijst).subscribe(() => {
      this.getLijsten();
    })
  }

  getStemLijsten() {
    this.mijnLijst = false;
    this.lijsten = [];
    this.stemService.getAllWhereGebruikerId(Number(localStorage.getItem('gebruikerId'))).subscribe(stemmen => {
      console.log(stemmen);
      stemmen.forEach(stem => {
        this.itemService.get(stem.item.itemID).subscribe(item => {
          this.lijstService.get(item.lijst.lijstID).subscribe(lijst => {
            var found = false;
            for (var i = 0; i < this.lijsten.length; i++) {
              if (this.lijsten[i].lijstID == lijst.lijstID) {
                found = true;
                break;
              }
            }

            if (found == false) {
              this.lijsten.push(lijst);
            }

            console.log(this.lijsten);

            this.lijsten.forEach(lijst => {
              this.itemService.GetItemsWhereLijst(lijst.lijstID).subscribe(items => {
                lijst.items = items;
                lijst.items.forEach(item => {
                  this.stemService.getAllWhereItemId(item.itemID).subscribe(stemmen => {
                    item.stemmen = stemmen;

                    item.gestemd = false;
                    for (var i = 0; i < item.stemmen.length; i++) {
                      if (item.stemmen[i].gebruiker.gebruikerID == this.gebruiker.gebruikerID) {
                        item.gestemd = true;
                        break;
                      }
                    }
                  })
                })
              })
            });
          })
        })
      });
    })

    this.titel = "Lijsten waarop jij hebt gestemd"
  }

  nieuw() {
    this.router.navigate(['/nieuweLijst']);
  }
}
