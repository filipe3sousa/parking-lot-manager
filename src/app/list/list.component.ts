import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { LotService } from '../lot.service';
import { PouchDBService } from '../pouchdb.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  lots: Array<any>;
  
  constructor(private lotService: LotService, private database: PouchDBService, private zone: NgZone) { }

  ngOnInit(): void {
    this.lots = this.getLots();

    this.database.getChangeListener().subscribe(data => {
      for(let i = 0; i < data.change.docs.length; i++) {
          this.zone.run(() => {
              this.lots.__zone_symbol__value.push(data.change.docs[i]);
          });
      }
    });
  }

  getLots(): Array<any> {
    // If we need polling we can implement it like this.
    // const lots$ = this.lotService.getAll();
    // return timer(0, 30000).pipe(
    //   concatMap(_ => lots$)
    // );

    return this.lotService.getAll();
    // return Observable.from(this.database.fetch());
  }

}
