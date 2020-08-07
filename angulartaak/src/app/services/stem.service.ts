import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stem } from '../models/stem.model';

@Injectable({
  providedIn: 'root'
})
export class StemService {

  constructor(private http: HttpClient) { }

  getAllWhereGebruikerId(id: number) {
    return this.http.get<Stem[]>(`https://localhost:44369/api/stem/gebruiker/${id}`);
  }

  getAllWhereItemId(id: number) {
    return this.http.get<Stem[]>(`https://localhost:44369/api/stem/item/${id}`);
  }

  add(stem: Stem) {
    return this.http.post<Stem>(`https://localhost:44369/api/stem`, stem);
  }

  GetExistence(itemID: number, gebruikerID: number) {
    return this.http.get<Boolean>(`https://localhost:44369/api/stem/${itemID}/${gebruikerID}`);
  }

  GetExistenceStem(itemID: number, gebruikerID: number) {
    return this.http.get<Stem>(`https://localhost:44369/api/stem/stem/${itemID}/${gebruikerID}`);
  }

  get(id: number) {
    return this.http.get<Stem>(`https://localhost:44369/api/stem/${id}`);
  }

  delete(id: number) {
    return this.http.delete<Stem>(`https://localhost:44369/api/stem/${id}`);
  }
}
