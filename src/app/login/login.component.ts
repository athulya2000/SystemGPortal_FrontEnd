import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 email=""
 password=""
 constructor(private route:Router){}

 readValues=()=>{
 let data:any={"email":this.email,"password":this.password}
 console.log(data)
 if(this.email=="dealer@gmail.com"&& this.password=="12345") {
 this.route.navigate(['/dealerportal'])
 }
 else{
  alert("Invalid Login Credentials")
  this.email=""
  this.password=""
 }
 }
}
