import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gebruiker } from '../models/gebruiker.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  loggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  logout(logoutBool){
    this.loggedIn.next(logoutBool ? true : false);
  }

  getAll() {
    return this.http.get<Gebruiker[]>(`https://localhost:44369/api/gebruiker`);
  }

  get(id: number) {
    return this.http.get<Gebruiker>(`https://localhost:44369/api/gebruiker/${id}`);
  }

  add(gebruiker: Gebruiker) {
    return this.http.post<Gebruiker>(`https://localhost:44369/api/gebruiker`, gebruiker);
  }

  getGebruikerByEmailAndPassword(email: string, password: string) {
  
    return this.http.get<Gebruiker>(`https://localhost:44369/api/gebruiker/${email}/${password}`);
  }
}
