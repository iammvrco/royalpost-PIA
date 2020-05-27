import { Component, OnInit } from '@angular/core';
import { ColumnService } from '../services/column.service';
import { ActivatedRoute } from '@angular/router';
import { ColumnI } from '../models/column.interface';
@Component({
  selector: 'app-columns',
  templateUrl: './columns.page.html',
  styleUrls: ['./columns.page.scss'],
}) 
export class ColumnsPage implements OnInit {
  category: string;
  columns: ColumnI[];
  UID: string;

  constructor(private columnServices: ColumnService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.category=this.activatedRoute.snapshot.paramMap.get('category');
    this.columnServices.getColumns().subscribe((columns) =>{
      this.columns=columns.filter(column=>{
        if(column.category === this.category)
          return true;
        else 
          return false;
      });
      console.log(this.columns);
    });
    this.UID=this.activatedRoute.snapshot.paramMap.get('uid');
  }
}
