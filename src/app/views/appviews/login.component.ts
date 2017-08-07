import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent implements OnInit{

  constructor(
    private router: Router
  ) {
  }

  loginAccount:{email:String,password:String};
  isLoginError:boolean;
  loginErrorMsg:String;

  ngOnInit(){
    this.loginAccount = {email:"zhangsan",password:"124455"};
    this.isLoginError = false;
    console.log("登陆初始化")
  }

  doLogin(){

    if(this.loginAccount.email == null || this.loginAccount.email != 'aa.com'
        || this.loginAccount.password == null || this.loginAccount.password != '123456'){

      this.loginErrorMsg = "password error";
      this.isLoginError = true;
    }else{

      this.loginErrorMsg = "";
      this.isLoginError = false;

      //redirect index
      this.router.navigate(['/dashboards/dashboard4']);
    }
  }

}
