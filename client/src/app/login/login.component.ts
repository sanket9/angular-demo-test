import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { Router } from "@angular/router";
import { DetailsComponent } from "../details/details.component";
import { environment } from "../../environments/environment";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from "../apiservice.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string;
  constructor(
    public route: Router,
    public apiServiece:ApiserviceService
  ) { }

  ngOnInit() {
    this.createForm()
  }
  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    })
  }

  getErrorMessage(){
    return this.loginForm.hasError('required') ? 'You must enter a value' : '';
  }

  onLoginSubmit(formData) {
    // console.log("here",formData);
    this.loginError = "";
    this.apiServiece.login(formData).subscribe((data:any) => {
      // console.log(data);
      if (data.status == 400) {
        this.loginError = data.message;
      }else if(data.user){

        delete data.user[0].password
        localStorage.setItem("user-data", JSON.stringify(data.user[0]));
        this.route.navigate(['details'])
      }else{
        this.loginError = "Something went Wrong.";
      }
      
    })
  }
}
