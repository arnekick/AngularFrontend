import { Component, OnInit } from '@angular/core';
import { GebruikerService } from '../services/gebruiker.service';
import { Gebruiker } from '../models/gebruiker.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  gebruiker: Gebruiker;
  melding = false;
  meldingS = "Vul al de velden in!";


  constructor(private gebruikerService: GebruikerService, private router: Router) { }

  ngOnInit() {
  }


  onSubmit() {
    if (this.email != null && this.password != null && this.email != "" && this.password != "") {
      this.melding = false;
      console.log(this.email + this.password);
      this.gebruikerService.getGebruikerByEmailAndPassword(this.email, this.password).subscribe(gebruiker => {
        this.gebruiker = gebruiker;
        console.log(gebruiker);
        if (this.gebruiker != undefined) {
          localStorage.setItem('gebruikerId', this.gebruiker.gebruikerID.toString());
          this.gebruikerService.logout(true);
          this.router.navigate(['/dashboard']);
        }
      }, error => {
        this.melding = true;
        this.meldingS = "De ingevulde informatie klopt niet!"
      })
    }
    if (this.email == null || this.password == null || this.email == "" || this.password == "") {
      this.melding = true;
      this.meldingS = "Vul al de velden in!";
    }
  }
}
