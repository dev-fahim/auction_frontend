import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuctionListSchema, ProfileSchema} from "@auction/api";

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {
  @Input() currentPage = 1;
  @Input() auctions?: AuctionListSchema | null;
  @Input() profile?: ProfileSchema;
  @Input() loading: boolean | null = false;

  @Output() pageChanged = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onPageChange(page: number): void {
    this.pageChanged.emit(page);
  }

}
