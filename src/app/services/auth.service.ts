import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:5001/api/auth';
  constructor(private httpClient: HttpClient) {}

  login(user: LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + '/login', user);
  }
  register(user: RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + '/register', user);
  }
  getAllUsers():Observable<ListResponseModel<User>>{
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl + '/getAll');
  }

  isAuthenticated() {
    return !!localStorage.getItem('token')
  }
}
