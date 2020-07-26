import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { UsersService } from  '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;   isValidUser:any;  userData: any;

  constructor(public  afAuth:  AngularFireAuth,private  userService:  UsersService, public  router:  Router) { 
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;   localStorage.setItem('user', JSON.stringify(this.user));
      } else {              localStorage.setItem('user', null);
      }      
    });
  }

  ngOnInit() { }

  signupUser(data) {
    return this.afAuth.createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {  }).catch((error) => {      window.alert(error.message)      })

      /*return new Promise<any>((resolve, reject) =>{
          this.firestore
              .collection("thoughtbees")
              .add(data)
              .then(res => {}, err => reject(err));
      });*/
  }

  async login(email: string, password: string) {  
    return auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result.user) {
          var user = result.user;
          this.router.navigate(['dashboard']);
        }
      })
      .catch(error => {          
        let notifyCls = document.getElementsByClassName("notifyCls") as HTMLCollectionOf<HTMLElement>; 
        notifyCls[0].style.display='block';   
      });
  }

  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }  
}