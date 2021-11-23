import { LoginModel } from "./loginModel";

export interface RegisterModel extends LoginModel{
    userName:string;
    firstName:string;
    lastName:string;
}