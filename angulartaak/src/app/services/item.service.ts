import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Item[]>(`https://localhost:44369/api/item`);
  }

  get(id: number) {
  
    return this.http.get<Item>(`https://localhost:44369/api/item/${id}`);
  }

  GetItemsWhereLijst(id: number) {
    return this.http.get<Item[]>(`https://localhost:44369/api/item/lijst/${id}`);
  }

  update(id: number , item: Item) {
    return this.http.put<Item>(`https://localhost:44369/api/item/${id}`, item);
  }

  add(item: Item) {
    return this.http.post<Item>(`https://localhost:44369/api/item`, item);
  }
}
