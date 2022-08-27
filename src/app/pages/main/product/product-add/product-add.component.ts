import {Component, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {ProfileState} from "../../../../../@auction/store/profile/state";
import {Observable} from "rxjs";
import {ProfileSchema} from "../../../../../@auction/api";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  @Select(ProfileState.profile)
  profile$?: Observable<ProfileSchema>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
