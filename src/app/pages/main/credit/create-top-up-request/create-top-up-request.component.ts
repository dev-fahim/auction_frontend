import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {CreditPostTopUpRequest} from "@auction/store";

@Component({
  selector: 'app-create-top-up-request',
  templateUrl: './create-top-up-request.component.html',
  styleUrls: ['./create-top-up-request.component.css']
})
export class CreateTopUpRequestComponent implements OnInit {
  amount: number = 0;
  disabled = false;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  onRequest() {
    if (this.amount >= 1000) {
      this.disabled = true;
      this.store.dispatch(new CreditPostTopUpRequest({amount: this.amount * 100})).subscribe(
        {
          next: (res) => {
            this.disabled = false;
          }
        }
      );
    }
  }

}
