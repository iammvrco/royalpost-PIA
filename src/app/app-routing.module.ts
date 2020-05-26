import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {  AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'home/:uid',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'articles/:category/:uid',
    canActivate: [AuthGuard],
    loadChildren: () => import('./articles/articles.module').then( m => m.ArticlesPageModule)
  },
  {
    path: 'article/:id/:uid',
    canActivate: [AuthGuard],
    loadChildren: () => import('./article/article.module').then( m => m.ArticlePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile/:uid',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
