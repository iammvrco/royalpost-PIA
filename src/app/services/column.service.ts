import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ColumnI } from '../models/column.interface';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  private columnsCollection: AngularFirestoreCollection<ColumnI>;
  private columns: Observable<ColumnI[]>;
  constructor(db: AngularFirestore) {
    this.columnsCollection = db.collection<ColumnI>('columns');
    this.columns = this.columnsCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id,...data}
        });
      })
    );
  }
  getColumns(){
    return this.columns;
  }
  addColumn(column: ColumnI){
    return this.columnsCollection.add(column);
  }

  getColumn(id:string){
    return this.columnsCollection.doc<ColumnI>(id).valueChanges();
  }

}
