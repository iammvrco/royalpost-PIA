import { Component, OnInit } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { UserI } from '../models/user.interface';
import { async } from '@angular/core/testing';
import { LoadingController } from '@ionic/angular';
import { ColumnI } from '../models/column.interface';
import { ColumnService } from '../services/column.service';
import { FormBuilder, Validators } from "@angular/forms";
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
      category: 'artist',
      name: 'Artistas'
    },
    {
      category: 'entertainment',
      name: 'Entretenimiento'
    },
    {
      category: 'sciencetec',
      name: 'Ciencia y tecnología'
    },
    {
      category: 'healthcare',
      name: 'Salud'
    },
    {
      category: 'sports',
      name: 'Deportes'
    },
    {
      category: 'news',
      name: 'Noticias'
    },
  ]

  registrationForm = this.formBuilder.group({
    title: ['',[Validators.required, Validators.minLength(3)]],
    category: ['',[Validators.required]],
    text: ['',[Validators.required]],
  });

  get title() {
    return this.registrationForm.get("title");
  }
  get text(){
    return this.registrationForm.get("text")
  }
  get category(){
    return this.registrationForm.get("category")
  }
  public errorMessages = {
    title: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 3 characters' }
    ],
    category: [
      { type: 'required', message: 'Category is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    text: [
      { type: 'required', message: 'Text is required' },
      { type: 'pattern', message: 'Name cant be longer than 100 characters' }
    ],
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private columnService: ColumnService,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder
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
    this.column.date = this.date.toUTCString();
    this.column.text = this.registrationForm.value.text;
    this.column.title = this.registrationForm.value.title;
    this.column.category = this.registrationForm.value.category;
    this.column.uid = this.user.uid;
    this.columnService.addColumn(this.column).then(() =>{
      loading.dismiss();
    })
    this.registrationForm.reset();
  }
}
