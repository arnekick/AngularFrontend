import { Component, OnInit } from '@angular/core';
import { Gebruiker } from '../models/gebruiker.model';
import { GebruikerService } from '../services/gebruiker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registreer',
  templateUrl: './registreer.component.html',
  styleUrls: ['./registreer.component.css']
})
export class RegistreerComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  pwdDiff = false;
  confirmPassword: string;
  melding = false;
  meldingS = "Vul al de velden in!"

  constructor(private gebruikerService: GebruikerService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.password == this.confirmPassword) {
      this.pwdDiff = false;
      if (this.username != null && this.password != null && this.email != null && this.confirmPassword != null && this.username != "" && this.password != "" && this.email != "" && this.confirmPassword != "") {
        this.melding = false;
        let gebruiker = new Gebruiker();
        gebruiker.gebruikersnaam = this.username;
        gebruiker.wachtwoord = this.password;
        gebruiker.email = this.email;
        this.gebruikerService.add(gebruiker).subscribe(() => { }, error => {
          this.melding = true;
          this.meldingS = "De ingevulde informatie klopt niet!"
        });
        this.router.navigateByUrl('/login');
      }
      if (this.username == null || this.password == null || this.email == null || this.confirmPassword == null || this.username == "" || this.password == "" || this.email == "" || this.confirmPassword == "") {
        this.melding = true;
        this.meldingS = "Vul al de velden in!";
      }
    } else {
      this.pwdDiff = true;
      this.melding = false;
    }
  }
}
