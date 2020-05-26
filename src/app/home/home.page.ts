import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ArticleI } from '../models/article.interface';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  articles: ArticleI[];
  uid:string;

  constructor(private articlesServices: ArticlesService, private activatedRoute: ActivatedRoute) {}


  ngOnInit(){{
    this.articlesServices.getArticles().subscribe((articles) => {
      this.articles=articles.splice(articles.length-3)
    });
    this.uid=this.activatedRoute.snapshot.paramMap.get('uid');
    console.log(this.uid);
  }}

  vertical={
    direction:"vertical",
  };

  horizontal={
    direction:"horizontal",
    loop:true,
  };

  

}
