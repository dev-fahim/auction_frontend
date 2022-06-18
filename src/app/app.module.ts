import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {SharedComponentsModule} from "../@auction/shared-components/shared-components.module";
import {ApiModule, Configuration} from "../@auction/api";
import {environment} from "../environments/environment";
import {NzMessageModule} from "ng-zorro-antd/message";
import {StorageService} from "../@auction/services/storage.service";
import {AuthService} from "../@auction/services/auth.service";
import {AuthGuard} from "../@auction/guards/auth.guard";
import {AuthNotGuard} from "../@auction/guards/auth-not.guard";
import {TOKEN_KEY} from "../@auction/contants";
import {en_US, NZ_I18N} from "ng-zorro-antd/i18n";
import {NgxsModule} from "@ngxs/store";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {ProfileState} from "../@auction/store/profile/state";
import {CategoryState} from "../@auction/store/category/state";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxsModule.forRoot([ProfileState, CategoryState], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    SharedComponentsModule,
    NzMessageModule,
    ApiModule.forRoot(() => new Configuration({
      apiKeys: {'ApiKeyAuth': environment.api_keys},
      basePath: environment.api_base_path,
      accessToken: () => StorageService.get(TOKEN_KEY) ?? ''
    }))
  ],
  providers: [StorageService, AuthService, AuthGuard, AuthNotGuard, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
