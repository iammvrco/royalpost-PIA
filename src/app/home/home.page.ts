import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ArticleI } from '../models/article.interface';
import { ArticlesService } from '../services/articles.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  articles: ArticleI[];
  UID:string;

  constructor(private articlesServices: ArticlesService, private activatedRoute: ActivatedRoute,private menuCtrl: MenuController) {}


  ngOnInit(){{
    this.articlesServices.getArticles().subscribe((articles) => {
      this.articles=articles.splice(articles.length-5);
      this.articles.reverse();
    });
    this.UID=this.activatedRoute.snapshot.paramMap.get('uid');
    //console.log(this.UID);
  }}

  vertical={
    direction:"vertical",
  };

  horizontal={
    direction:"horizontal",
    loop:true,
  };

  

}
