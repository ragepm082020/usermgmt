import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { UsersService } from  '../users.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';//'./users/modal/modal.component';


export interface DialogData {
  id: string;
  name: string;
  dept: string;
}

@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.css']
})

export class UserMgmtComponent {
  displayedColumns = ['id', 'name', 'dept', 'action'];
  id: string;   name: string;  dept: string;
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService : UsersService, public dialog: MatDialog) {
    
    this.userService.getUsersList().subscribe((data) => {
      var results : UserData[] =[];
      
      for (var i = 0; i < data.length; i++) {
         results.push({ "id": data[i].payload.doc.get('id'),"name":data[i].payload.doc.get('name'),"dept": data[i].payload.doc.get('dept'),"docId":data[i].payload.doc.id});         
      }

      this.dataSource = new MatTableDataSource(results); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;  
    });               
}

openDialog(): void {
  const dialogRef = this.dialog.open(ModalComponent, {    width: '450px',   
   data: {id: this.id, name: this.name, dept:this.dept, actionPerformed:'add'}  });
  dialogRef.afterClosed().subscribe(result => {    console.log('The dialog was closed');    this.id = result;  });
}

  ngOnInit() { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  updateUser(userDocId, userId, userName, userDept){        
    const dialogRef = this.dialog.open(ModalComponent, {    width: '450px',    
    data: {docId: userDocId, id: userId, name: userName, dept:userDept, actionPerformed:'edit'}  });
    dialogRef.afterClosed().subscribe(result => {    console.log('The dialog was closed');    this.id = result;  });
  }

  deleteUser(docId){    
    this.userService.deleteUser(docId);
  }
}

export interface UserData {
  id?: string;
  name?: string;
  dept?: string;
  docId?:string;
  //action: string;
}
