import { Injectable } from '@angular/core';
import {Action, State, StateContext, Selector} from '@ngxs/store';
import {ProfileStateModel} from "./model";
import {ProfileSchema, UserProfilesService} from "../../api";
import {GetProfile} from "./actions";
import {NzMessageService} from "ng-zorro-antd/message";
import {catchError, finalize, tap} from "rxjs";

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: null
  }
})
@Injectable()
export class ProfileState {
  constructor(private profileService: UserProfilesService,
              private msg: NzMessageService) {
  }

  @Selector()
  static profile(state: ProfileStateModel): ProfileSchema | null {
    return state.profile;
  }

  @Action(GetProfile)
  getProfile(ctx: StateContext<ProfileStateModel>, action: GetProfile) {
    // const loadingId = this.msg.loading('Please wait...', {nzDuration: 0}).messageId;
    return this.profileService.userProfileApiViewsGetProfileObject().pipe(
      tap({
        next: (res) => {
          const state = ctx.getState();
          ctx.setState({
            ...state,
            profile: res,
          })
        },
        error: (e) => {
          this.msg.warning('Error getting profile');
        }
      }),
      finalize(() => {
        // this.msg.remove(loadingId);
      })
    );
  }
}
