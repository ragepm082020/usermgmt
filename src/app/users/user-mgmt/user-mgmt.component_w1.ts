import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.css']
})
export class UserMgmtComponent implements OnInit {
  //employees:any;
  columndefs : any[] = ['name','description'];
  
  employees=[{
    // "id": "emp001",
     "name": "shankar",
     "description":"desccccc"
   },{
   //  "id": "emp002",
     "name": "raja",
     "description":"desccccc"
   },
 ];
 //,'details','update','delete'];
  constructor() { }

  ngOnInit(){
   
  }

}
