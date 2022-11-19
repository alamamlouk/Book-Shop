import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../interfaces/login';  
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string="";  
  returnUrl: string=""; 
  public loginForm !: FormGroup
  constructor(private formBuilder:FormBuilder,private http: HttpClient,private router:Router, private authService : AuthService  ) { }

  model: ILogin = { userid: "alaa", password: "alaa123" } ;
 log( x :any){console.log(x);}
 submit(login:any)    {
   console.log(" from submited",login)
 }
  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      name:[''],
      password:['']
    })
    this.returnUrl = '/home';
  }
  Login()
  { if (this.loginForm.value.name == this.model.userid && this.loginForm.value.password == this.model.password) {  
    console.log("Login successful");  
    sessionStorage.setItem("name",'admin');
    localStorage.setItem('isLoggedIn', "true");  
    localStorage.setItem('token', this.loginForm.value.name);  
    this.router.navigate([this.returnUrl]);  
    alert("welcome admin")
    }
    else  
    {this.http.get<any>("http://localhost:3000/login").subscribe(res=>{
      const user=res.find((a:any)=>{
        console.log(res);
        
        return a.name ===this.loginForm.value.name && a.password ===this.loginForm.value.password
      })
      console.log(user);
      
      if(user){
        alert("login success");
        sessionStorage.setItem("name",'user');
        
        this.router.navigate(['home']);
      }else {alert("try again please")}


    }
    )}
}}
