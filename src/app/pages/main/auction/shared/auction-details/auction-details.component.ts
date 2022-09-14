import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {environment} from 'src/environments/environment';
import {AuctionSchema, AuctionsService, ProfileSchema} from "@auction/api";
import {PlotlyDataLayoutConfig} from "plotly.js-dist-min";

@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.css']
})
export class AuctionDetailsComponent implements OnInit, OnChanges {
  @Input() auction?: AuctionSchema | null;
  @Input() loading: boolean | null = false;
  @Output() bidPlaced = new EventEmitter<number>();
  @Input() profile?: ProfileSchema | null;
  amount = 0;
  loadedTimes = 0;

  timeSeriesData: PlotlyDataLayoutConfig = {
    data: [],
    config: {responsive: true}
  };

  environment = environment;

  constructor(private auctionService: AuctionsService) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.loadedTimes++;
    if (this.auction) {
      console.log(this.auction);
      this.auctionService.auctionApiViewsGetAuctionBidsTimeSeriesData(this.auction.guid).subscribe({
        next: (res) => {
          this.timeSeriesData.data[0] = {
            x: (function () {
              const data = [];
              for (let i = 0; i < res.data.length; i++) {
                data.push(i);
              }
              return data;
            })(), y: (function() {
              const data = [];
              for (let i = 0; i < res.data.length; i++) {
                data.push(res.data[i] / 100);
              }
              return data;
            })(), mode: 'lines',
          };
        }
      });
    }
  }

  onBidPlace(amount: number) {
    if (amount > 0 && this.auction && this.auction.next_bid! <= amount) {
      this.bidPlaced.emit(amount);
    }
  }

}
