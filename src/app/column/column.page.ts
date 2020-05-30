import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ColumnService } from '../services/column.service';
import { ColumnI } from '../models/column.interface';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-column',
  templateUrl: './column.page.html',
  styleUrls: ['./column.page.scss'],
})
export class ColumnPage implements OnInit {
  column: ColumnI = {
    author: '',
    category: '',
    date: '',
    text: '',
    title: '',
    uid: ''
  }
  columnId=null;
  UID: string;
  constructor(
    private columnsServces: ColumnService, 
    private activatedRoute: ActivatedRoute,
    private loadingCOntroller: LoadingController) { }

  ngOnInit() {
    this.columnId = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadColumn();
    this.UID=this.activatedRoute.snapshot.paramMap.get('uid');
    //console.log(this.UID);
  }  

  async loadColumn(){
    const loading = await this.loadingCOntroller.create({
      message: 'Loading...'
    });
    await loading.present();
    this.columnsServces.getColumn(this.columnId).subscribe(column =>{
      loading.dismiss();
      this.column=column;
    })
  }
}
