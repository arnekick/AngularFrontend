import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lijst } from '../models/lijst.model';
import { Gebruiker } from '../models/gebruiker.model';

@Injectable({
  providedIn: 'root'
})
export class LijstService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Lijst[]>(`https://localhost:44369/api/lijst`);
  }

  get(id: number) {
  
    return this.http.get<Lijst>(`https://localhost:44369/api/lijst/${id}`);
  }

  GetNaamContains(naam: string) {
    return this.http.get<Lijst[]>(`https://localhost:44369/api/lijst/naam/${naam}`);
  }

  GetByGebruiker(gebruikerID: number) {
    return this.http.get<Lijst[]>(`https://localhost:44369/api/lijst/gebruiker/${gebruikerID}`);
  }

  add(lijst: Lijst) {
    return this.http.post<Lijst>(`https://localhost:44369/api/lijst`, lijst);
  }

  update(id: number, lijst: Lijst) {
    return this.http.put<Lijst>(`https://localhost:44369/api/lijst/${id}`, lijst);
  }
}
