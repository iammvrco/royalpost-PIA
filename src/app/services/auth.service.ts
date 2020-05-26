import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../shared/user.class';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;

  constructor(public afAuth:  AngularFireAuth) { 
    afAuth.authState.subscribe( user =>(this.isLogged = user));
  }

  //login
  async onLogin(user){
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
}
