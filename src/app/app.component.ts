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
      category: 'music',
      name: 'Música',
      icon: 'musical-notes-outline'
    },
    {
      category: 'sports',
      name: 'Deportes',
      icon: 'tennisball-outline'
    },
    {
      category: 'authors',
      name: 'Autores',
      icon: 'earth-outline'
    },
    {
      category: 'economy',
      name: 'Economía',
      icon: 'cash-outline'
    },
    {
      category: 'famous',
      name: 'Famosos',
      icon: 'star-outline'
    },
    {
      category: 'science',
      name: 'Ciencia',
      icon: 'bug-outline'
    }
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
        this.UID=user.uid
    });
  }

  closeMenu(){
    this.menuCtrl.close();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout(){
    console.log('Logout!');
    this.afAuth.signOut();
    this.router.navigateByUrl('/login');
    this.closeMenu();
  }

  

}
 