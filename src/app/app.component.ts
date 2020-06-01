import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MenuController } from '@ionic/angular';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  UID;
  options = [
    {
      category: 'artist',
      name: 'Artistas',
      icon: 'star'
    },
    {
      category: 'entertainment',
      name: 'Entretenimiento',
      icon: 'film'
    },
    {
      category: 'sciencetec',
      name: 'Ciencia y tecnología',
      icon: 'flask'
    },
    {
      category: 'healthcare',
      name: 'Salud',
      icon: 'pulse'
    },
    {
      category: 'sports',
      name: 'Deportes',
      icon: 'baseball'
    },
    {
      category: 'news',
      name: 'Noticias',
      icon: 'newspaper'
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private authSvc: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private activatedRoute: ActivatedRoute
  ) {
    this.initializeApp();
    this.afAuth.onAuthStateChanged( user => {
      if(user)
        this.UID=user.uid;
    });
  }

  closeMenu(){
    this.menuCtrl.close();
    this.statusBar.backgroundColorByName('black');
    this.statusBar.styleLightContent();
  }

  open(){
    this.statusBar.backgroundColorByName('white');
    this.statusBar.styleDefault();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByName('black');
      this.statusBar.styleLightContent();
    });
  }

  onLogout(){
    //console.log('Logout!');
    this.authSvc.onLogout().then(()=>{
      this.router.navigateByUrl('/login');
    })
  }
}
 