import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../Services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    loginForm!:FormGroup;
    errorMsg!:string
    constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) {
    }
    ngOnInit(): void {

      this.loginForm=this.formBuilder.group({
        email:this.formBuilder.control("",[Validators.email,Validators.required]),
        password:this.formBuilder.control("",[Validators.required])
      })
    }

    login():void{
      let username=this.loginForm.value.email;
      let password=this.loginForm.value.password;
      this.authService.login(username,password).subscribe({
          next: user=>{
              if(user.role=="ADMIN"){
                  this.router.navigateByUrl("/admin")
              }else{
                  this.errorMsg="Sorry , you are not allowed , you need to be an admin  "
              }

          },
          error:err=>{
              this.errorMsg="Login Failed! Please check your email and password.";
          }
          }

      );


    }

    getErrorMsg(name: string, errors: ValidationErrors | null) {

        if(!(errors) || errors['required']){
            return name+" is required"
        }else if(!(errors) || errors['email']){
            return "insert an email here exemple@gmail.com"
        } else {
            return ""
        }
    }

}
