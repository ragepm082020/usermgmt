import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from  '../../users/users.service';
import { AuthService } from  '../../auth/auth.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit { 
  signupForm: FormGroup; showSignupSuccess: boolean = false;
  error_messages = {    
    'email': [{ type: 'required', message: 'Email is required.' },{ type: 'email', message: 'please enter a valid email address.' }],
    'password': [{ type: 'required', message: 'password is required.' },{ type: 'minlength', message: 'password length.' }, { type: 'maxlength', message: 'password length.' }
    ],
    'confirmpassword': [{ type: 'required', message: 'Confirm password is required.' }, ],
  }

  constructor(public formBuilder: FormBuilder,private  userService:  UsersService,private  authService:  AuthService, public  router:  Router) {
    this.signupForm = this.formBuilder.group({ 
      email: new FormControl('', Validators.compose([ Validators.required,  Validators.email])),
      password: new FormControl('', Validators.compose([ Validators.required,  Validators.minLength(6), Validators.maxLength(30)   ])),
      confirmpassword: new FormControl('', Validators.compose([Validators.required,])),
    }, {    validators: this.passwordConfirm.bind(this) });      
   
  }
  ngOnInit() {
    //fetch data
    this.listUsers();
    
     // res =>(console.log(res[0].payload.doc.data())));//this.coffeeOrders = res));

    }

  passwordConfirm(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');

    if((password!='' && confirmPassword !=='') && password !== confirmPassword){     
      let verifyPwdElements = document.getElementsByClassName("verifyPwd") as HTMLCollectionOf<HTMLElement>;    
      let signupBtnElements = document.getElementsByClassName("btnSignUpSubmit") as HTMLCollectionOf<HTMLElement>;        
      verifyPwdElements[0].style.border='1px solid red';    
      verifyPwdElements[0].style.color ='red';
      verifyPwdElements[0].innerHTML = 'Password and confirm Password does not match';
      signupBtnElements[0].setAttribute("disabled", "disabled");      
    } 

    if((password!='' && confirmPassword !=='') && password === confirmPassword){     
      let verifyPwdElement1 = document.getElementsByClassName("verifyPwd") as HTMLCollectionOf<HTMLElement>;    
      let signupBtnElements = document.getElementsByClassName("btnSignUpSubmit") as HTMLCollectionOf<HTMLElement>;          
      verifyPwdElement1[0].style.border='1px solid #FFF';        
      verifyPwdElement1[0].innerHTML='';
      signupBtnElements[0].removeAttribute("disabled");
    }
  }

  get f() { return this.signupForm.controls; }

  submitSignUpUser() {      
      let data = this.signupForm.value;     
      var promiseObj = this.authService.signupUser({email:data.email, password:data.password})
      .then(res => {
        //console.log('added user details');
        //this.router.navigate(['login']);
      });
      this.showSignupSuccess=true;
      //this.router.navigate(['login']);
        
  }

  listUsers(){
    this.userService.getUsersList().subscribe(res =>(console.log(res[0].payload.doc.data())));//this.coffeeOrders = res));
  }

}