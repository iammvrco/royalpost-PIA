import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';

import { NavController, NavParams } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  uid;

  constructor(
    private auThSvc: AuthService, 
    private router: Router,
    ) { }

  ngOnInit() {
  }
  async onLogin(){
    const user = await this.auThSvc.onLogin(this.user);
    
    if(user){
      const uid=user.user.uid;
      console.log('Successfully logged user!');
      this.router.navigate(['/home',uid]);
      this.uid=uid;
    }
  }
}
