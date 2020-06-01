import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../shared/user.class';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;

  constructor(public afAuth:  AngularFireAuth) { 
    afAuth.authState.subscribe( user =>(this.isLogged = user));
  }

  //login
  async onLogin(user:User){
    try{
      return await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
    }catch( error ){
      console.log('Error on login user' ,error);
    }
  }

  //register
  async onRegister(user){
    try{
      return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    }catch( error ){
      console.log('Error on login user' ,error);
    }
  }

  async onLogout(){
    this.afAuth.authState.subscribe( () =>this.isLogged = true);
    return await this.afAuth.signOut();
  }
}
