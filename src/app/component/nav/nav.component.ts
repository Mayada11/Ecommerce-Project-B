import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../shared/user.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  search:any;
  userType:any;
  userOradmin:any;
  userDetails:any;
 public oni:any;
  constructor(private userService: UserService,private router:Router,private route:ActivatedRoute) { 
  
  }
isLogin:any;
public  ngOnInit(): void {
  this.oni = this.ngOnInit;
     this.userType = localStorage['userType']
   console.log(this.userType)
    if(this.userService.isLoggedIn()){ this.userService.getUserProfile().subscribe(
      res => {
      
        this.userDetails = res['user'];
        console.log(this.userDetails);
       
      //  location.reload();
        
      },
      err => { 
        console.log(err);
        
      }
    );
    localStorage['isLoged']=this.userService.isLoggedIn();
    this.isLogin= localStorage['isLoged'];
    console.log(this.isLogin)
  }
   
   
   
  }
  onSearch(){
    if(this.search){
      localStorage['searchValue'] = this.search
      console.log("thsss")
          this.router.navigate(['/searchPage']);
    }
  }

  profile(){
   
    if(this.userService.isLoggedIn()){
      this.router.navigate(['/userprofile']);
    }
    else{
  
      this.router.navigate(['/login']);
    }
  }

  goToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }

  onLogout(){
    this.userService.deleteToken();
    // this.router.navigate(['/login']);
    this.router.navigate(['/login']);
  }


  // add(){
  //   if(this.userService.isLoggedIn() && this.userService.userType==0){
  //     this.router.navigateByUrl('/adminProduct');
      
  //   }
  //   else{
  //     this.router.navigateByUrl('/login');
  //   }
  // }
  isLoginAsAdmin(){
    
   if(this.userService.isLoggedIn()==true &&  this.userType==0){
        return true;

   }else{
     return false;
   }
  }
  isLoginAsUser(){
  
   if(this.userService.isLoggedIn()==true && this.userType==1){
        return true;

   }else{
     return false;
   }
  }
  isLoginAnything(){
    if(this.userService.isLoggedIn()==true){
      return true;

 }else{
   return false;
 }
  }
}
