import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { UserI } from '../models/user.interface';
import { async } from '@angular/core/testing';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  uid: string;
  userdata: UserI[];
  user: UserI = {
    name: '',
    nationality: '',
    uid: '',
  }; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private loadingController: LoadingController
  ) { 
  }

  ngOnInit() {
    this.uid=this.activatedRoute.snapshot.paramMap.get('uid');
     this.usersService.getUsers().subscribe((users) => {
      this.userdata = users.filter(user =>{
        if(user.uid===this.uid)
          return true;
        else
          return false;
      });
      this.user=this.userdata[0];
      console.log(this.userdata);
    });
    console.log(this.user);
  }
}
