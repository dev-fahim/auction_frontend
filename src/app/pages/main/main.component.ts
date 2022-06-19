import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../@auction/services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {ProfileSchema} from "../../../@auction/api";
import {Select, Store} from "@ngxs/store";
import {ProfileState} from "../../../@auction/store/profile/state";
import {GetProfile} from "../../../@auction/store/profile/actions";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  isCollapsed = false;

  @Select(ProfileState.profile)
  profile$?: Observable<ProfileSchema>

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetProfile());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
