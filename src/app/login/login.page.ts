import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { NavController, NavParams } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { FormBuilder, Validators } from "@angular/forms";
import { MenuController } from '@ionic/angular';
import { initializeApp } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();

  registrationForm = this.formBuilder.group({
    email: ['',[
      Validators.required, 
      Validators.pattern('^[a-zA-Z0-9._&-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
    ]],
    password: ['',[
      Validators.required,
      Validators.maxLength(16),

      Validators.minLength(6)
    ]],
  }); 
  get email() {
    return this.registrationForm.get("email");
  }
  get password(){
    return this.registrationForm.get("password")
  }
  public errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'maxlength', message: 'Email cant be longer than 60 characters' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
  };
  constructor(
    private auThSvc: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit() {

  }
  async onLogin(){
    this.user.email =  await this.registrationForm.value.email;
    this.user.password = await this.registrationForm.value.password;
    const user = await this.auThSvc.onLogin(this.user);
    if(user){
      const uid = user.user.uid;
      //console.log('Successfully logged user!');
      this.menuCtrl.enable(true);
      this.router.navigate(['/home',uid]);
    }
  }
  ionViewWillEnter(){
    this.menuCtrl.close();
    this.menuCtrl.enable(false);
    this.registrationForm.reset();
  }
}
