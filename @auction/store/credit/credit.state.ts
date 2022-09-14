import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  CreditAction,
  CreditGetCreditObject,
  CreditgetTopUpRequestList,
  CreditGetTransactionList,
  CreditPostTopUpRequest
} from './credit.actions';
import {CreditSchema, CreditsService, CreditTransactionListSchema, TopUpRequestListSchema} from "@auction/api";
import {tap} from "rxjs";
import produce from "immer";

export class CreditStateModel {
  public items?: string[];
  public credit?: CreditSchema;
  public transactions?: CreditTransactionListSchema;
  public topUps?: TopUpRequestListSchema;
}

const defaults: CreditStateModel = {};

@State<CreditStateModel>({
  name: 'credit',
  defaults
})
@Injectable()
export class CreditState {
  constructor(private creditsService: CreditsService) {
  }

  @Selector()
  static credit({credit}: CreditStateModel): CreditSchema {
    return credit!;
  }

  @Selector()
  static transactions({transactions}: CreditStateModel): CreditTransactionListSchema {
    return transactions!;
  }

  @Selector()
  static topUps({topUps}: CreditStateModel): TopUpRequestListSchema {
    return topUps!;
  }

  @Action(CreditAction)
  add({getState, setState}: StateContext<CreditStateModel>, {payload}: CreditAction) {
    const state = getState();
    setState({items: [...state.items!, payload]});
  }

  @Action(CreditGetCreditObject)
  getCreditObject({setState}: StateContext<CreditStateModel>) {
    return this.creditsService.userProfileApiViewsGetCredit().pipe(
      tap({
        next: (res) => {
          setState(produce((draft) => {
            draft.credit = res;
          }));
        }
      })
    );
  }

  @Action(CreditGetTransactionList)
  getTransactionList({setState}: StateContext<CreditStateModel>, {pageNumber}: CreditGetTransactionList) {
    return this.creditsService.userProfileApiViewsGetCreditTransactions(pageNumber).pipe(
      tap({
        next: (res) => {
          setState(produce((draft) => {
            draft.transactions = res;
          }));
        }
      })
    );
  }

  @Action(CreditPostTopUpRequest)
  postTopUpRequest({setState}: StateContext<CreditStateModel>, {payload}: CreditPostTopUpRequest) {
    return this.creditsService.userProfileApiViewsPostTopUpRequest(payload).pipe(
      tap({
        next: (res) => {
          setState(produce((draft) => {
            draft.topUps!.data.unshift(res);
          }))
        }
      })
    );
  }

  @Action(CreditgetTopUpRequestList)
  getTopUpRequestList({setState}: StateContext<CreditStateModel>, {pageNumber}: CreditgetTopUpRequestList) {
    return this.creditsService.userProfileApiViewsGetTopUpRequestList(pageNumber).pipe(
      tap({
        next: (res) => {
          setState(produce((draft) => {
            draft.topUps = res;
          }));
        }
      })
    );
  }
}
