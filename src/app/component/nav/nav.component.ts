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
    this.userType = localStorage['userT']
  this.userOrAdminName = localStorage['userOrAdminName'];
this.userOrAdminImage = localStorage['userOrAdminImage'];
console.log(this.userType);
console.log(this.userOrAdminImage);
console.log(this.userOrAdminName);
  }
isLogin:any;
userOrAdminName:any;
userOrAdminImage:any;
public  ngOnInit(): void {
  if(this.userService.isLoggedIn()){
    this.userType = localStorage['userT']
    this.userOrAdminName = localStorage['userOrAdminName'];
  this.userOrAdminImage = localStorage['userOrAdminImage'];
  console.log(this.userType);
  console.log(this.userOrAdminImage);
  console.log(this.userOrAdminName);
  }
    //  this.userType = localStorage['userT']
  
  // if(this.userService.isLoggedIn()){

// }
  //     res => {
      
  //       this.userDetails = res['user'];
  //       console.log(this.userDetails);
       
  //     //  location.reload();
        
  //     },
  //     err => { 
  //       console.log(err);
        
  //     }
  //   );
  //   localStorage['isLoged']=this.userService.isLoggedIn();
  //   this.isLogin= localStorage['isLoged'];
  //   console.log(this.isLogin)
  // }
   
   
   
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
    
    localStorage['userType'] = undefined;
    localStorage['userOrAdminName'] = undefined;
    localStorage['userOrAdminImage'] = undefined;
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
    
   if((this.userService.isLoggedIn()===true) &&  (this.userType==0)){
     console.log(this.userType)
        return true;

   }else{
     console.log("hi not admin")
     return false;
   }
  }
  isLoginAsUser(){
  
   if((this.userService.isLoggedIn()===true) && (this.userType==1)){
    console.log(this.userType)
        return true;

   }else{
    console.log("hi not user")
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
