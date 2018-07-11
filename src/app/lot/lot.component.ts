import { Component, OnInit, Input } from '@angular/core';

import { LotService } from '../lot.service';
import { PouchDBService } from '../pouchdb.service';

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss']
})
export class LotComponent implements OnInit {

  @Input() lot: any;

  constructor(private lotService: LotService, private database: PouchDBService) { }

  ngOnInit() {

  }

  bookLot() {
    const lot = Object.assign({}, this.lot, {available: false});
    this.lotService.updateLot(lot).then(() => this.lot = lot);
  }

}
