import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userCollection: AngularFirestoreCollection<UserI>;
  private users: Observable <UserI[]>; 

  constructor(db: AngularFirestore) {
    this.userCollection = db.collection<UserI>('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id,...data }
        });
      })
    );
   }
   getUsers(){
     return this.users;
   }
   getUser(id: string){
     return this.userCollection.doc<UserI>(id).valueChanges;
   }

  addUser(user:UserI){
    return this.userCollection.add(user);
  }
}
