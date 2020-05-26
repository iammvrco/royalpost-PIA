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
  UID:string;
  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService, 
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {

    this.articleId = this.route.snapshot.params['id'];
    this.loadArticle();
    this.UID=this.activatedRoute.snapshot.paramMap.get('uid');
    console.log(this.UID);
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
