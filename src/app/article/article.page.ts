import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { ActivatedRoute} from '@angular/router';

import { ArticleI } from '../models/article.interface';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  article: ArticleI = {
    author: '',
    category: '',
    date: '',
    image: '',
    subtitle: '',
    text: '',
    title: ''
  }

  articleId = null;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService, 
    private loadingController: LoadingController ) { }

  ngOnInit() {

    this.articleId = this.route.snapshot.params['id'];
    this.loadArticle();
  }

  async loadArticle(){
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    this.articlesService.getArticle(this.articleId).subscribe(article => {
      loading.dismiss();
      this.article=article;
    })
  }

}
