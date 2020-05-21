import { Component } from '@angular/core';

import { ArticleI } from '../models/article.interface';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  articles: ArticleI[];

  constructor(private articlesServices: ArticlesService) {}


  ngOnInit(){{
    this.articlesServices.getArticles().subscribe((articles) => {
      this.articles=articles.splice(articles.length-3)
    });
  }}




  vertical={
    direction:"vertical",
  };

  horizontal={
    direction:"horizontal",
    loop:true,
  };

}
