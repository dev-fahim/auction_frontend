import {Injectable} from '@angular/core';
import {Action, State, StateContext} from '@ngxs/store';
import {AuctionAction} from './auction.actions';

export class AuctionStateModel {
  public items: string[] = [];
}

const defaults = {
  items: []
};

@State<AuctionStateModel>({
  name: 'auction',
  defaults
})
@Injectable()
export class AuctionState {
  @Action(AuctionAction)
  add({getState, setState}: StateContext<AuctionStateModel>, {payload}: AuctionAction) {
    const state = getState();
    setState({items: [...state.items, payload]});
  }
}
