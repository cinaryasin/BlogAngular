import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
   if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          localStorage.setItem('token', response.data.token);
          this.router.navigate(['/']);
          console.log(response);
        },
        (err) => {
          if(err.status == 400){
            console.log(err.error);
          }
          console.log(err.error);
        }
      );
     
   }
  }
}
