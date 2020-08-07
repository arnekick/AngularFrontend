import { Component, OnInit } from '@angular/core';
import { LijstService } from '../services/lijst.service';
import { GebruikerService } from '../services/gebruiker.service';
import { Lijst } from '../models/lijst.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nieuwe-lijst',
  templateUrl: './nieuwe-lijst.component.html',
  styleUrls: ['./nieuwe-lijst.component.css']
})
export class NieuweLijstComponent implements OnInit {

  beschrijving: string;
  naam: string;
  melding = false;
  meldingS = "Vul al de velden in!";

  constructor(private lijstService: LijstService, private gebruikerService: GebruikerService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.beschrijving != null && this.naam != null && this.beschrijving != "" && this.naam != "") {
      this.melding = false;
      let lijst = new Lijst();
      lijst.naam = this.naam;
      lijst.beschrijving = this.beschrijving;
      lijst.actief = false;
      this.gebruikerService.get(Number(localStorage.getItem('gebruikerId'))).subscribe(gebruiker => {
        lijst.eigenaar = gebruiker;
        this.lijstService.add(lijst).subscribe(() => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigateByUrl('/dashboard');
        });
      })
    }
    if (this.beschrijving == null || this.naam == null || this.beschrijving == "" || this.naam == "") {
      this.melding = true;
      this.meldingS = "Vul al de velden in!";
    }
  }
}
