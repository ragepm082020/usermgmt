import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import { UsersService } from './';
import {UsersService} from './../users/users.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  dataStatistics :any; 
  @Output() keyPressOnChild = new EventEmitter();
 
  constructor(private  userService:  UsersService) { }
  ngOnInit() {
    //   this.keyPressOnChild.emit('IT');

   }
  onKeyPressed(value)  {    this.keyPressOnChild.emit(value);  }

  updateChartfromChild(){

    this.userService.getUsersList().subscribe((data) => {
      //var results : UserData[] =[];
      /*itDeptUsers
      hrDeptUsers
      adminDeptUsers*/
      let itDeptUsers=0; let hrDeptUsers=0; let adminDeptUsers=0;
      
       for (var i = 0; i < data.length; i++) {
       // console.log(data[i].payload.doc.get('dept'))
        if(data[i].payload.doc.get('dept')==='IT')  {
          itDeptUsers++;
        }
        if(data[i].payload.doc.get('dept')==='Admin')  {
          adminDeptUsers++;
        }

        if(data[i].payload.doc.get('dept')==='Hr')  {
          hrDeptUsers++;
        }

        //console.log(itDeptUsers + '#####' + adminDeptUsers + '#####' +hrDeptUsers );
        
        
       }


       this.keyPressOnChild.emit(adminDeptUsers + '#####' +hrDeptUsers + '#####' +  itDeptUsers);
          
    });    
  }
  
}
    //this.keyPressOnChild.emit('Test');

    //dataStatistics
    //Get Users Count Department Wise




  