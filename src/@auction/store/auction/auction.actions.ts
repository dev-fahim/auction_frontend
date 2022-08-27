export class AuctionAction {
  static readonly type = '[Auction] Add item';

  constructor(public payload: string) {
  }
}
