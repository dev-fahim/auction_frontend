import {Component, OnInit} from '@angular/core';
import {AuctionsService, ConsoleHomeDataSchema} from "@auction/api";
import {PlotlyDataLayoutConfig} from "plotly.js-dist-min";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  timeSeriesData: PlotlyDataLayoutConfig = {
    data: [],
    config: {responsive: true}
  };
  consoleData?: ConsoleHomeDataSchema;
  donutData: PlotlyDataLayoutConfig = {
    data: [],
    layout: {
      showlegend: false
    },
    config: {responsive: true}
  }

  constructor(private auctionService: AuctionsService) {
  }

  ngOnInit(): void {
    this.auctionService.auctionApiViewsGetBidsTimeSeriesData().subscribe({
      next: (res) => {
        this.timeSeriesData.data[0] = {
          x: (function () {
            const data = [];
            for (let i = 0; i < res.data.length; i++) {
              data.push(i);
            }
            return data;
          })(), y: res.data, mode: 'lines',
        };
      }
    });
    this.auctionService.auctionApiViewsGetConsoleData().subscribe({
      next: (res) => {
        this.consoleData = res;
        this.donutData.data[0] = {
          values: [res.total_verified_products, res.total_on_process_products],
          labels: ['Verified Products', 'On Process Products'],
          type: 'pie',
          textposition: "outside",
          textinfo: "label+percent",
          automargin: true
        };
      }
    })
  }

}
