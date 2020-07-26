import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from  '../../users/users.service';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  addUserForm: FormGroup; editAction=false;

  error_messages = {
    'id': [{ type: 'required', message: 'Please enter Id.' }],
    'name':[{ type: 'required', message: 'Please enter name.' }],
    'dept':[{ type: 'required', message: 'Please enter department' }]
    }

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,public formBuilder: FormBuilder,private  userService:  UsersService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

      this.addUserForm = this.formBuilder.group({
        id: new FormControl('', Validators.compose([ Validators.required])),
        name: new FormControl('', Validators.compose([ Validators.required ])),
        dept: new FormControl('', Validators.compose([ Validators.required ]))
       });  

       this.addUserForm.patchValue({
        id: data['id'],
        name: data['name'],
        dept: data['dept']
      });

      if(data['actionPerformed']==='edit'){        
        this.editAction=true;
      }       
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() { }

  addUser(){    
    if(this.editAction){        
      let data = this.addUserForm.value;     
      this.userService.updateUser(this.data['docId'],data.id,data.name,data.dept); 
    } else {
      console.log('Add')
      let data = this.addUserForm.value;     
      this.userService.addUsertoFB(data.id,data.name,data.dept); 
    }
    
    this.dialogRef.close();
  }
}
