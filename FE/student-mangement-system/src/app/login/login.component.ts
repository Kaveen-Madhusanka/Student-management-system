import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup= new FormGroup({});
  constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required]),
    });
    this.form.markAsPristine();
  }
  submit() {
    if (this.form.valid) {
      this.userService.login(+this.form.controls['username'].value,this.form.controls['password'].value).subscribe(x=>{
        console.log('token: ',x);
        if (x.token != null){
          localStorage.setItem('Token',x.token);
          this.router.navigate(['/students']);
        }
      });
    }
  }

  Test() {
    this.userService.Test().subscribe(x=>{
      console.log('Success');
    });
  }
}
