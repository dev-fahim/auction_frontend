import { Component, OnInit } from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {CreditGetCreditObject, CreditState} from "@auction/store";
import {CreditSchema} from "../../../../../@auction";
import {Observable} from "rxjs";

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  @Select(CreditState.credit)
  credit?: Observable<CreditSchema>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new CreditGetCreditObject());
  }

}
