import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user.class';
import { UserI } from '../models/user.interface';
import { LoadingController } from '@ionic/angular';
import { UsersService } from '../services/users.service';
import { FormBuilder, Validators } from "@angular/forms";
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  userdata: UserI = {
    description: '',
    uid: '',
    name: '',
    nationality: '',
  }; 
  registrationForm = this.formBuilder.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    email: ['',[
      Validators.required, 
      Validators.pattern('^[a-zA-Z0-9._&-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
    ]],
    password: ['',[
      Validators.required,
      Validators.maxLength(16),

      Validators.minLength(6)
    ]],
    nationality: ['',[Validators.required]],
    description: ['',[Validators.required]],
  });

  options = [
    {
      nationality: 'Argentina',
      name: 'Argentina',
    },
    {
      nationality: 'Boliviana',
      name: 'Boliviana',
    },
    {
      nationality: 'Chilena',
      name: 'Chilena',
    },
    {
      nationality: 'Colombiana',
      name: 'Colombiana',
    },
    {
      nationality: 'Costarricense',
      name: 'Costarricense',
    },
    {
      nationality: 'Cubana',
      name: 'Cubana',
    },
    {
      nationality: 'Dominicana',
      name: 'Dominicana',
    },
    {
      nationality: 'Eucatoriana',
      name: 'Eucatoriana',
    },
    {
      nationality: 'Estadounidense',
      name: 'Estadounidense',
    },
    {
      nationality: 'Guatemalteca',
      name: 'Guatemalteca',
    },
    {
      nationality: 'Hondureña',
      name: 'Hondureña',
    },
    {
      nationality: 'Mexicana',
      name: 'Mexicana',
    },
    {
      nationality: 'Nicaraguense',
      name: 'Nicaraguense',
    },
    {
      nationality: 'Panameña',
      name: 'Panameña',
    },
    {
      nationality: 'Paraguaya',
      name: 'Paraguaya',
    },
    {
      nationality: 'Puertorriqueña',
      name: 'Puertorriqueña',
    },
    {
      nationality: 'Peruona',
      name: 'Peruona',
    },
    {
      nationality: 'Salvadoreña',
      name: 'Salvadoreña',
    },
    {
      nationality: 'Uruguaya',
      name: 'Uruguaya',
    },
    {
      nationality: 'Venezolana',
      name: 'Venezolana',
    }
  ]

  get name() {
    return this.registrationForm.get("name");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password(){
    return this.registrationForm.get("password")
  }
  get nationality(){
    return this.registrationForm.get("nationality");
  }
  get description(){
    return this.registrationForm.get("description");
  }
  public errorMessages = {
    name: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Please enter a valid phone number' }
    ],
    nationality: [
      { type: 'required', message: 'Nationality is required' },
      {
        type: 'maxlength',
        message: 'Nationality name cant be longer than 100 characters'
      }
    ],
    description: [
      {type: 'required', message: 'Description is required'},
      {type: 'minLength', message: 'Description cant be longer'},
    ],
  };

  constructor(
    private auThSvc: AuthService,
    private router: Router,
    private loadingController: LoadingController, 
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController) { }

  ngOnInit() {
  }

  async onRegister(){
    this.user.email = this.registrationForm.value.email;
    this.user.password = this.registrationForm.value.password;
    const user = await this.auThSvc.onRegister(this.user);
    if(user){
      console.log('Successfully created user!');
      this.userdata.uid=user.user.uid;
      this.userdata.name=this.registrationForm.value.name;
      this.userdata.nationality=this.registrationForm.value.nationality;
      this.userdata.description=this.registrationForm.value.description;
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

  public submit() {
    console.log(this.registrationForm.value);
  }
  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }
}
