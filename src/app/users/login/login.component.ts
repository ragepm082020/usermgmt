import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from  '../../auth/auth.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; submitted = false;

  error_messages = {
    'email': [{ type: 'required', message: 'Email is required.' },{ type: 'email', message: 'please enter a valid email address.' }],
    'password': [
      { type: 'required', message: 'password is required.' },{ type: 'minlength', message: 'password length.' }, { type: 'maxlength', message: 'password length.' }
    ]}

  constructor(public formBuilder: FormBuilder, private  authService:  AuthService, public  router:  Router) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([ Validators.required,  Validators.email])),
      password: new FormControl('', Validators.compose([ Validators.required ])),
     });   
    
  }
  ngOnInit() { 
    let notifyCls = document.getElementsByClassName("notifyCls") as HTMLCollectionOf<HTMLElement>;   
    notifyCls[0].style.display='none';
   }

   get f() { return this.loginForm.controls; }

   onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {          return;      }

      this.authService.login(this.loginForm.value.email,this.loginForm.value.password);
      this.router.navigate(['dashboard']);
    } 
}