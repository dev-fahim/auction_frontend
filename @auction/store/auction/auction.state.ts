import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  AuctionAction,
  AuctionClearAuctionList,
  AuctionClearAuctionObject,
  AuctionGetAuctionObject,
  AuctionGetRunningAuctionList, AuctionPostPlaceBidTransaction
} from './auction.actions';
import {AuctionListSchema, AuctionSchema, AuctionsService} from "../../api";
import {tap} from "rxjs";
import produce from "immer";
import {Socket} from "ngx-socket-io";
import {AuctionSocketService} from "../../services/auction-socket.service";
import {NzMessageService} from "ng-zorro-antd/message";

export interface AuctionStateModel {
  items?: string[];
  auctions?: AuctionListSchema;
  auction?: AuctionSchema;
  loading?: boolean;
}

const defaults: AuctionStateModel = {
  loading: false
};

@State<AuctionStateModel>({
  name: 'auction',
  defaults
})
@Injectable()
export class AuctionState {
  constructor(private auctionsService: AuctionsService, private socket: Socket, private auctionSocket: AuctionSocketService, private msg: NzMessageService) {
  }

  @Selector()
  static auctions({auctions}: AuctionStateModel): AuctionListSchema {
    return auctions!;
  }

  @Selector()
  static auction({auction}: AuctionStateModel): AuctionSchema {
    return auction!;
  }

  @Selector()
  static loading({loading}: AuctionStateModel): boolean {
    return loading ?? false;
  }

  @Action(AuctionAction)
  add({getState, setState}: StateContext<AuctionStateModel>, {payload}: AuctionAction) {
    const state = getState();
    setState({items: [...state.items!, payload]});
  }

  @Action(AuctionGetRunningAuctionList)
  getAuctionLis(ctx: StateContext<AuctionStateModel>, {pageNumber}: AuctionGetRunningAuctionList) {
    const {setState} = ctx;
    this.toggleLoading(ctx);
    return this.auctionsService.auctionApiViewsGetAllAuctionList(pageNumber).pipe(
      tap({
        next: (res) => {
          setState(produce((draft) => {
            draft.auctions = res;
          }));
          this.toggleLoading(ctx);
        }
      })
    );
  }

  @Action(AuctionGetAuctionObject)
  getAuctionObject(ctx: StateContext<AuctionStateModel>, {auctionGuid}: AuctionGetAuctionObject) {
    const {setState} = ctx;
    this.toggleLoading(ctx);
    return this.auctionsService.auctionApiViewsGetAuctionObject(auctionGuid).pipe(
      tap({
        next: (res) => {
          setState(produce((draft) => {
            draft.auction = res;
          }));
          this.toggleLoading(ctx);
          this.auctionSocket.connectToAuctionRoom(res.guid, this.socket.ioSocket.id).subscribe({
            next: () => {
              this.socket.on('auction_changed', (data: AuctionSchema) => {
                setState(produce((draft) => {
                  draft.auction = data;
                }));
                this.msg.success('New bid on this auction!!!', );
              });
            }
          });
        }
      })
    );
  }

  @Action(AuctionPostPlaceBidTransaction)
  placeBidTransaction(ctx: StateContext<AuctionStateModel>, {bid}: AuctionPostPlaceBidTransaction) {
    this.toggleLoading(ctx);
    return this.auctionsService.auctionApiViewsPlaceBidTransaction(bid).pipe(
      tap({
        next: () => {
          this.toggleLoading(ctx);
        }
      })
    );
  }

  @Action(AuctionClearAuctionObject)
  clearAuctionObject({getState, setState}: StateContext<AuctionStateModel>) {
    this.socket.removeAllListeners('auction_changed');
    return this.auctionSocket.leaveFromAuctionRoom(getState().auction!.guid, this.socket.ioSocket.id).pipe(
      tap({
        next: () => {
          setState(produce((draft) => {
            draft.auction = undefined
          }));
        }
      })
    );
  }

  @Action(AuctionClearAuctionList)
  clearAuctionList({setState}: StateContext<AuctionStateModel>) {
    setState(produce((draft) => {
      draft.auctions = undefined
    }));
  }

  toggleLoading({setState}: StateContext<AuctionStateModel>): void {
    setState(produce((draft) => {
      draft.loading = !draft.loading;
    }));
  }
}
