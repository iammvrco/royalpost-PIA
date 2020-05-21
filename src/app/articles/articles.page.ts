import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ArticleI } from '../models/article.interface';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  category: string;

  articles: ArticleI[];

  constructor( private articlesServices: ArticlesService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.category=this.activatedRoute.snapshot.paramMap.get('category');
    this.articlesServices.getArticles().subscribe((articles) => {
      this.articles=articles.filter(article => {
        if(article.category===this.category)
          return true;
        else  
          return false
      });
    });
  }

}
