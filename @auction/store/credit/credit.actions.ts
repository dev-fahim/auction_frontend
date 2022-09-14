import {TopUpRequestCreateSchema} from "../../api";

export class CreditAction {
  static readonly type = '[Credit] Add item';
  constructor(public payload: string) { }
}

export class CreditGetCreditObject {
  static readonly type = '[Credit] Get Credit Object';
}

export class CreditGetTransactionList {
  static readonly type = '[Credit] Get Transaction List';

  constructor(public pageNumber: number) {
  }
}

export class CreditPostTopUpRequest {
  static readonly type = '[Credit] Post Top-Up Request';

  constructor(public payload: TopUpRequestCreateSchema) {
  }
}

export class CreditgetTopUpRequestList {
  static readonly type = '[Credit] Post Top-Up Request List';

  constructor(public pageNumber: number) {
  }
}
