import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms'

import { UserService } from '../../shared/user.service'


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
  // , providers: [UserService] i add it at provider in app.module.ts
})
export class SignInComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  constructor(private userService: UserService,private router : Router) { }

  model ={
    email :'',
    password:''
  };

userDetails:any;
reess:any;
  ngOnInit() {
    // if(this.userService.isLoggedIn())
    // this.router.navigateByUrl('/adminProduct');
  }

  onSubmit(form : NgForm){
    // this.ngOnInit();
    // console.log(form.value);
    this.userService.login(form.value).subscribe(
      res => {
        console.log(res);
        this.userService.setToken(res['token']);
   
        localStorage['userType'] = res['userType'];
        console.log( localStorage['userType']);
        // location.reload();
    
        if(res['userType']===0){
          // this.router.navigate(['/dashboard']);
          this.router.navigate(['/adminProduct']);
        }
        else if(res['userType']===1){
          this.router.navigate(['/producthome']);
        }
        this.userService.getUserProfile().subscribe(
          res => {
          location.reload();
            this.userDetails = res['user'];
            console.log(this.userDetails);
            localStorage['userOrAdminName'] = this.userDetails.name;
            localStorage['userOrAdminImage'] = this.userDetails.userImage;
            localStorage['userT'] = this.userDetails.userType;
            
            
          },
          err => { 
            console.log(err);
            
          }
        );
      
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );

  }  

}
