import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { UserI } from '../models/user.interface';
import { async } from '@angular/core/testing';
import { LoadingController } from '@ionic/angular';
import { ColumnI } from '../models/column.interface';
import { ColumnService } from '../services/column.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  date: Date = new Date();
  UID: string;
  user: UserI = {
    description: '',
    name: '',
    nationality: '',
    uid: '',
  }; 
  column: ColumnI = {
    author: '',
    category:'',
    date: '',
    text: '',
    title: '',
    uid: '',
  };
  columns: ColumnI[];

  options = [
    {
      category: 'music',
      name: 'Música',
    },
    {
      category: 'sports',
      name: 'Deportes',
    },
    {
      category: 'authors',
      name: 'Autores',
    },
    {
      category: 'economy',
      name: 'Economía',
    },
    {
      category: 'famous',
      name: 'Famosos',
    },
    {
      category: 'science',
      name: 'Ciencia',
    }
  ]


  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private columnService: ColumnService,
    private loadingController: LoadingController
  ) { 
  }

  ngOnInit() {
    var userdata;
    this.UID=this.activatedRoute.snapshot.paramMap.get('uid');
     this.usersService.getUsers().subscribe((users) => {
      userdata = users.filter(user =>{
        if(user.uid===this.UID)
          return true;
        else
          return false;
      });
      this.user=userdata[0];
      this.loadColumns();
    });
  }
  loadColumns(){
    this.columnService.getColumns().subscribe(columns =>{
      this.columns = columns.filter(column =>{
        if(column.uid === this.UID)
          return true;
        else
          return false;
      })
    })
  }

  async addcolumn(){
    const loading = await this.loadingController.create({message: 'saving'});
    await loading.present();
    this.column.author = this.user.name;
    this.column.date = this.date.toString();
    this.column.uid = this.user.uid;
    this.columnService.addColumn(this.column).then(() =>{
      loading.dismiss();
    })
  }
}
