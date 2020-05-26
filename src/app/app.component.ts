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

  uid;

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
        this.uid=user.uid
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
 