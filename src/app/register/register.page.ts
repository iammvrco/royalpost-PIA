import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { UserI } from '../models/user.interface';
import { LoadingController } from '@ionic/angular';
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  userdata: UserI = {
    uid: '',
    name: '',
    nationality: ''
  };


  constructor(private auThSvc: AuthService, private router: Router
    ,private loadingController: LoadingController, 
    private userService: UsersService) { }

  ngOnInit() {
  }

  async onRegister(){
    const user = await this.auThSvc.onRegister(this.user);
    
    if(user){
      console.log('Successfully created user!');
      this.userdata.uid=user.user.uid;
      this.saveUser();
      this.router.navigateByUrl('/');

    }
  }

  async saveUser(){
    const loading = await this.loadingController.create({
      message: 'Saving'
    });
    await loading.present();
    this.userService.addUser(this.userdata).then(() => {
      loading.dismiss();
    });
  }

}
