import { Component, OnInit } from '@angular/core';
import { LijstService } from '../services/lijst.service';
import { Lijst } from '../models/lijst.model';
import { ItemService } from '../services/item.service';
import { StemService } from '../services/stem.service';
import { Stem } from '../models/stem.model';
import { GebruikerService } from '../services/gebruiker.service';
import { Item } from '../models/item.model';
import { Gebruiker } from '../models/gebruiker.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gebruiker: Gebruiker;
  lijsten: Lijst[] = [];
  zoeken: string = null;

  constructor(private lijstService: LijstService, private itemService: ItemService, private stemService: StemService, private gebruikerService: GebruikerService) { }

  ngOnInit() {
    this.gebruikerService.get(Number(localStorage.getItem('gebruikerId'))).subscribe(gebruiker => {
      this.gebruiker = gebruiker;
      console.log(this.gebruiker)
    }, error => {

    })

    this.getLists();
  }

  getLists() {
    this.lijstService.getAll().subscribe(lijsten => {
      this.lijsten = lijsten;
      this.lijsten.forEach(lijst => {
        this.itemService.GetItemsWhereLijst(lijst.lijstID).subscribe(items => {
          lijst.items = items;
          lijst.items.forEach(item => {
            this.stemService.getAllWhereItemId(item.itemID).subscribe(stemmen => {
              item.stemmen = stemmen;

              item.gestemd = false;
              for (var i = 0; i < item.stemmen.length; i++) {
                if (this.gebruiker === undefined) {
                  console.log("HI")
                  item.gestemd = false;
                  break;
                }
                if (item.stemmen[i].gebruiker.gebruikerID == this.gebruiker.gebruikerID) {
                  item.gestemd = true;
                  break;
                }
              }

            })
          })
        })
      });
      console.log(this.lijsten);
    })
  }

  filter() {
    this.lijstService.GetNaamContains(this.zoeken).subscribe(lijsten => {
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
}
