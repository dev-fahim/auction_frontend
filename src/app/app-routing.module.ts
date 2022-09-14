import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from "../../@auction/guards/auth.guard";
import {AuthNotGuard} from "../../@auction/guards/auth-not.guard";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/main'},
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard],
    data: { animation: 'page' }
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [AuthNotGuard],
    data: { animation: 'page' }
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [AuthNotGuard],
    data: { animation: 'page' }
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./pages/password-reset/password-reset.module').then(m => m.PasswordResetModule),
    canActivate: [AuthNotGuard],
    data: { animation: 'page' }
  },
  { path: 'fun', loadChildren: () => import('./pages/fun/fun.module').then(m => m.FunModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
