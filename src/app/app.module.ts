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
import {NzAlertModule} from "ng-zorro-antd/alert";
import {AuthGuard} from "../@auction/guards/auth.guard";
import {AuthNotGuard} from "../@auction/guards/auth-not.guard";

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
    SharedComponentsModule,
    NzMessageModule,
    ApiModule.forRoot(() => new Configuration({
      apiKeys: {'ApiKeyAuth': environment.api_keys},
      basePath: environment.api_base_path
    }))
  ],
  providers: [StorageService, AuthService, AuthGuard, AuthNotGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
