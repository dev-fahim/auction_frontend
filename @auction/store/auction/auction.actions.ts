import {PlaceBidTransactionSchema} from "../../api";

export class AuctionAction {
  static readonly type = '[Auction] Add item';

  constructor(public payload: string) {
  }
}

export class AuctionGetRunningAuctionList {
  static readonly type = '[Auction] Get Running Auction List';

  constructor(public pageNumber: number) {
  }
}

export class AuctionClearAuctionList {
  static readonly type = '[Auction] Clear Auction List';

  constructor() {
  }
}

export class AuctionGetAuctionObject {
  static readonly type = '[Auction] Get Auction Object';

  constructor(public auctionGuid: string) {
  }
}

export class AuctionClearAuctionObject {
  static readonly type = '[Auction] Clear Auction Object';

  constructor() {
  }
}

export class AuctionGetAuctionBidTransactionList {
  static readonly type = '[Auction] Get Auction Bid Transactions List';

  constructor(public auctionGuid: string) {
  }
}

export class AuctionPostPlaceBidTransaction {
  static readonly type = '[Auction] Get Auction Bid Transactions List';

  constructor(public bid: PlaceBidTransactionSchema) {
  }
}

export class AuctionJoinToAuctionRTSRoom {
  static readonly type = '[Auction] Listen to Auction RTS';

  constructor() {
  }
}

export class AuctionLeaveFromAuctionRTSRoom {
  static readonly type = '[Auction] Leave From Auction RTS';

  constructor() {
  }
}
