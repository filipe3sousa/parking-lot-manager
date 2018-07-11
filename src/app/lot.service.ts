import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PouchDBService } from './pouchdb.service';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  constructor(private http: HttpClient, private database: PouchDBService) {
    this.database.sync('http://localhost:5984/foursource');
   }

  getAll(): Array<any> {
    // return this.http.get<any[]>('http://localhost:3000/lots?_sort=id&_order=desc');
    return this.database.fetch().then(res => res.rows.map(row => row.doc));
  }

  updateLot(lot) {
    // return this.http.put<any>('http://localhost:3000/lots/' + lot.id, lot);
    return this.database.put(lot._id, lot);
  }

}
