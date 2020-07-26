import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { FormsModule,ReactiveFormsModule  }   from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './users/signup/signup.component';
import { LoginComponent } from './users/login/login.component';
import { DashboardComponent } from './users/dashboard/dashboard.component';
import { UserMgmtComponent } from './users/user-mgmt/user-mgmt.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './users/menu/menu.component';
import { ModalComponent } from './users/modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ChildComponent } from './child/child.component';


var config = {
  apiKey: "AIzaSyA604QYxhPnRfpX6dNdCFHvF42eGBuJ7Hw",
  authDomain: "tttee0832.firebaseapp.com",
  databaseURL: "https://tttee0832.firebaseio.com",
  projectId: "tttee0832",
  storageBucket: "tttee0832.appspot.com",
  messagingSenderId: "55652856920"
};

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    UserMgmtComponent,
    MenuComponent,
    ModalComponent,
    ChildComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatDialogModule
  ],
  exports: [ MatFormFieldModule, MatInputModule,MatSelectModule,MatTableModule ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
