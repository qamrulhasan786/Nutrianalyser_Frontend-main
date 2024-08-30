import { Directive, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Observable, of, Subject } from "rxjs";
import { Posts } from 'src/app/app.model';


interface dataObj {
  responseCode: any[];
  responseMessage: string;
  responseValue: any[];
  token: any[];
}

@Directive()
@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: any;
  _baseURL: any;
  _organicURL: any;
  _profilePath: any;
  data: any;


  constructor(private http: HttpClient,
    private AuthService: AuthService,
    private router: Router) {

    // -- live url
    // this._baseURL = "https://criteriontech.co.in:612"; // live ssl url
    // this._organicURL = "https://theorganicdelight.com:86"; // organicURL Live

    // -- local url
    // this._baseURL = "http://localhost:51457"; //local system

    this._baseURL = "http://172.16.14.78:98"; //local server 
    this._organicURL = "http://192.168.7.13:147"; // organicURL local


    this._profilePath = this._baseURL + '/FileUpload/';

    this.token = -1;

  }
  isEmpty(value: string | undefined) {
    if (value === "" || value === undefined) {
      return true;
    } else {
      return false;
    }
  }
  isEmptyValue(value: string | number | null | undefined) {
    if (
      value === "0" ||
      value === "" ||
      value === 0 ||
      value === undefined ||
      value === null
    ) {
      return true;
    } else {
      return false;
    }
  }
  getCurrentDate(date: any) {
    var today = date != null ? new Date(date) : new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10 && mm < 10) {
      return yyyy + "-0" + mm + "-0" + dd;
    } else if (mm < 10) {
      return yyyy + "-0" + mm + "-" + dd;
    } else if (dd < 10) {
      return yyyy + "-" + mm + "-0" + dd;
    } else {
      return yyyy + "-" + mm + "-" + dd;
    }
  }
  
  isValidToken() {
    if (
      this.token < 0 ||
      this.token === false ||
      this.token !== localStorage.getItem("AUTHTOKEN")
    ) {
      this.token = localStorage.getItem("AUTHTOKEN")
        ? localStorage.getItem("AUTHTOKEN")
        : -1;
    }

    if (!this.isEmpty(this.token) && this.token != -1) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }

  setHeaders() {
    let httpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("token", this.token);
    let options = {
      headers: httpHeaders
    };
    return options;
  }
  
  CheckExistMobile(data: any) {
    let httpBody = new HttpParams().set("mobileNo", data.signUpMobile);
    httpBody = httpBody.append("CallingCodeId", data.signUpCountry);
    return this.http.post<dataObj>(
      this._baseURL + "/api/UserRegistration/CheckExistMobile",
      httpBody
    );
  }
  doLogin(data: any) {
    let httpBody = new HttpParams().set("userName", data.username);
    (httpBody = httpBody.append("password", data.password)),
      (httpBody = httpBody.append("CallingCodeId", data.loginCountry));
    return this.http.post<dataObj>(
      this._baseURL + "/api/Login/LoginAuthentication",
      httpBody
    );
  }

  sendMobileOTP(data: any) {
    let httpBody = new HttpParams().set("mobileNo", data.signUpMobile);
    httpBody = httpBody.append("CallingCodeId", data.signUpCountry);
    return this.http.post<dataObj>(this._baseURL + "/api/UserRegistrationNew/SendMobileOTP", httpBody);
  }

  newRegistration(data: any) {
    let httpBody = new HttpParams().set("CallingCodeId", data.signUpCountry);
    (httpBody = httpBody.append("mobileNo", data.signUpMobile)),
      (httpBody = httpBody.append("emailId", data.email)),
      (httpBody = httpBody.append("otp", data.OTP)),
      (httpBody = httpBody.append("password", data.password)),
      (httpBody = httpBody.append("name", data.fullName));
    return this.http.post<dataObj>(
      this._baseURL + "/api/UserRegistrationNew/RegistrationNew",
      httpBody
    );
  }

  forgetPassword(data: any) {
    let httpBody = new HttpParams().set("CallingCodeId", data.loginCountry);
    (httpBody = httpBody.append("userName", data.username))
    return this.http.post<dataObj>(
      this._baseURL + "/api/Login/ForgetPassword",
      httpBody
    );
  }

  getPhoneCodes() {
    debugger;
    let httpBody = new HttpParams();
    return this.http.post<dataObj>(
      this._baseURL + "/api/Universal/GetCountryCallingCode",
      httpBody
    );
  }
 

  getIngredientsByUserList(obj: any): Observable<any> {
   // if (this.isValidToken()) {
      let headers = this.setHeaders();
      return this.http.post<dataObj>(
        this._baseURL + "/api/RecipeByUser/GetIngredientsByUserList",
        obj,
        headers
      );
    //}
  }
  
  getFoodTiming(): Observable<any> {
      let headers = this.setHeaders();
      return this.http.post<dataObj>(this._baseURL + "/api/UserIntake/GetFoodTiming", headers);
  }
  getFoodUnitByFoodId(obj: Posts): Observable<any> {
    
      let headers = this.setHeaders();
      return this.http.post<dataObj>(
        this._baseURL + "/api/Universal/GetFoodUnitByFoodId",
        obj,
        headers
      );
    
  }
  getFoodList(obj: Posts): Observable<any> {
      let headers = this.setHeaders();
      return this.http.post<dataObj>(
        this._baseURL + "/api/UserIntake/GetFoodList",
        obj,
        headers
      );
  }
  getFoodSpecificNutrient(obj: Posts): Observable<any> {
      let headers = this.setHeaders();
      return this.http.post<dataObj>(
        this._baseURL + "/api/UserIntake/GetNutrientValuesByFood",
        obj,
        headers
      );
  }


}
