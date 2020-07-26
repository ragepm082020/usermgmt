import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  user: User;
  constructor(public  afAuth:  AngularFireAuth, private firestore: AngularFirestore, public  router:  Router) { }

  getUsersList() {     
    return this.firestore.collection("thoughtbees").snapshotChanges();
  }

  addUsertoFB(userId,userName, userDept) { 
    let submitData = {       id : userId,      name: userName,      dept: userDept   };    
    return new Promise<any>((resolve, reject) =>{
    this.firestore
        .collection("thoughtbees")
        .add(submitData)
        .then(res => {}, err => reject(err));
    });
  }

  updateUser(docId, userId, username, userDept) {    
    //console.log(data + " ---- " +  userId  + " ---- " + username  + " ---- " + userDept)
    return this.firestore.collection("thoughtbees").doc(docId).set({ id: userId, name: username, dept: userDept});
  }

  deleteUser(data) {
    return this.firestore.collection("thoughtbees").doc(data).delete();
  }  
}
