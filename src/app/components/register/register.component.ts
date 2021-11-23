import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      let registerModel = Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        console.log(response);
        localStorage.setItem("token",response.data.token);
        this.router.navigateByUrl("/login")
      },(responseError) => {
        if (responseError.error.Errors.length > 0) {
          console.log(responseError.error.Errors); // array geldiğinden foreachde ya da forda döncez
          
        }
      }
    );
      }
      else{
        console.log("hede");
      }
    }

}
