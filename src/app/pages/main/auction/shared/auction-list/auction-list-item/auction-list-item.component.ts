import { Component, OnInit, Input } from '@angular/core';
import {AuctionSchema} from "@auction/api";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auction-list-item',
  templateUrl: './auction-list-item.component.html',
  styleUrls: ['./auction-list-item.component.css']
})
export class AuctionListItemComponent implements OnInit {
  @Input() auction?: AuctionSchema;
  now = Date.now();

  environment = environment;

  constructor() { }

  ngOnInit(): void {
  }

  date(date: string): number {
    return new Date(date).getTime();
  }

}
