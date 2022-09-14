import { Injectable }from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { CreditAction } from './credit.actions';

export class CreditStateModel {
  public items?: string[];
}

const defaults = {
  items: []
};

@State<CreditStateModel>({
  name: 'credit',
  defaults
})
@Injectable()
export class CreditState {
  @Action(CreditAction)
  add({ getState, setState }: StateContext<CreditStateModel>, { payload }: CreditAction) {
    const state = getState();
    setState({ items: [ ...state.items!, payload ] });
  }
}
