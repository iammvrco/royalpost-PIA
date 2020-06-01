import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleI } from '../models/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private articlesCollection: AngularFirestoreCollection<ArticleI>;
  private articles: Observable<ArticleI[]>;

  constructor( db: AngularFirestore ) { 
    this.articlesCollection = db.collection<ArticleI>('articles' , ref => ref.orderBy('date','asc'));
    this.articles = this.articlesCollection.snapshotChanges().pipe(
      map( actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }

  getArticles(){
    return this.articles;
  }

  getArticle( id: string ){
    return this.articlesCollection.doc<ArticleI>(id).valueChanges();
  }

}