import { Component, OnInit } from '@angular/core';
//import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loginDTO, signUpDTO } from 'src/app/app.model';
import { UserService } from 'src/app/services/user/user.service';
import * as $ from "jquery";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  signUpDTO: signUpDTO;
  loginDTO: loginDTO;
  showLoginForm: boolean;
  showNone: boolean;
  showOTP: boolean;
  showRegisterForm: boolean;
  showForgotPW: boolean;
  uniqueMobile: any;
  mobileCodes: any;
  confirmPassword: any;
  
  constructor(private userService: UserService,private router: Router,
    private toastr: ToastrService ) {
    
    this.showLoginForm = false;
    this.loginDTO = new loginDTO();
    this.signUpDTO = new signUpDTO();
    this.showNone = true;
    this.showOTP = false;
    this.showRegisterForm = false;
    this.showLoginForm = false;
    this.showForgotPW = false;
    this.signUpDTO.signUpCountry = 99;
    this.loginDTO.loginCountry = 99;
    this.signUpDTO.isLactation = 2;
    this.signUpDTO.isPregnant = 2;
    this.signUpDTO.gender = 0;
    this.signUpDTO.activityType = 0;
    this.signUpDTO.pregnantType = 0;
    this.signUpDTO.lactationType = 0; }

    ngOnInit() {
       
      this.getPhoneCodes();
      this.showRegisterForm = true;
      this.showLoginForm = true;
    }

  showForm(form: string) {
    if (form == "login") {
      this.showNone = false;
      this.showLoginForm = true;
      this.showRegisterForm = false;
      this.showForgotPW = false;
      this.showOTP = false;
    } else if (form == "register") {
      this.showNone = false;
      this.showRegisterForm = true;
      this.showLoginForm = false;
      this.showForgotPW = false;
      this.showOTP = false;
    } else if (form == "forgotPW") {
      this.showNone = false;
      this.showForgotPW = true;
      this.showLoginForm = false;
      this.showRegisterForm = true;
      this.showOTP = false;
    } else if (form == "verifyPhone") {
      this.showNone = false;
      this.showOTP = true;
      this.showRegisterForm = false;
      this.showLoginForm = false;
      this.showForgotPW = false;
    } else if (form == "None") {
      this.showNone = true;
      this.showOTP = false;
      this.showRegisterForm = false;
      this.showLoginForm = false;
      this.showForgotPW = false;
    } else if ((form = "registerform2")) {
      this.showNone = false;
      this.showRegisterForm = true;
      this.showOTP = false;
      this.showRegisterForm = false;
      this.showLoginForm = false;
      this.showForgotPW = false;
    }
  }


  getPhoneCodes() {
    this.userService.getPhoneCodes().subscribe((data: { responseValue: any; }) => {
      this.mobileCodes = data.responseValue;
    });
  }
  
   // Initicate login
   doLogin() {
    if (
      this.loginDTO.loginCountry &&
      this.loginDTO.username &&
      this.loginDTO.password
    ) {
      this.userService.doLogin(this.loginDTO).subscribe((data: any) => {
        this.success(data);
      });
    }
  }

  // Login success function
  success(data: any) {
    if (data.responseCode === 1) {
      localStorage.setItem("AUTHTOKEN", data.userToken);
      localStorage.setItem("userData", JSON.stringify(data.responseValue));

      if (data.responseValue[0].userRoleID == 3) {
        this.router.navigate(["../admin"]);
      } else {
        this.router.navigate(["../home/diet-intake"]);
        //this.router.navigate(["dashboard"]);
      }

      this.toastr.success("Logged In Successfully", "Success");
    } else {
      this.toastr.error("Invalid Credentials", "Failed");
    }
  }

  checkMobileNo() {
    if (
      this.userService.isEmptyValue(this.signUpDTO.signUpCountry) ||
      this.userService.isEmptyValue(this.signUpDTO.signUpMobile)
    ) {
      return;
    }
    this.userService.CheckExistMobile(this.signUpDTO).subscribe(data => {
      if (data.responseMessage != "Success!") {
        this.toastr.warning(data.responseMessage, "Warning");
        this.uniqueMobile = false;
      } else {
        this.uniqueMobile = true;
      }
    });
  }

  generateOTP() {
    if (this.uniqueMobile) {
      if (
        !this.userService.isEmptyValue(this.signUpDTO.signUpCountry) ||
        !this.userService.isEmptyValue(this.signUpDTO.signUpMobile)
      ) {
        this.userService.sendMobileOTP(this.signUpDTO).subscribe((data: { responseValue: { MobileOTPId: any; }[]; }) => {
          this.signUpDTO.OTPID = data.responseValue[0].MobileOTPId;
          this.showForm("verifyPhone");
        });
      }
    } else {
      this.checkMobileNo();
    }
  }

  verifyNumber() {
    if (!this.userService.isEmptyValue(this.signUpDTO.OTP)) {
      this.userService.newRegistration(this.signUpDTO).subscribe((data: { responseMessage: string | undefined; }) => {
        if (data.responseMessage == "Success!") {
          this.loginDTO.loginCountry = this.signUpDTO.signUpCountry;
          this.loginDTO.username = this.signUpDTO.signUpMobile;
          this.loginDTO.password = this.signUpDTO.password;
          this.doLogin();
        } else {
          this.toastr.error(data.responseMessage, "Failed");
        }
      });
    }
  }

  forgotPassword() {
    if (
      !this.userService.isEmptyValue(this.loginDTO.loginCountry) ||
      !this.userService.isEmptyValue(this.loginDTO.username)
    ) {
      this.userService.forgetPassword(this.loginDTO).subscribe((data: { responseMessage: string | undefined; }) => {
        if (data.responseMessage == 'Success!') {
          this.showRegisterForm = true;
          this.toastr.success('Your Password has been sent to the registered Mobile Number', 'Success')
          this.showForm("login");
        } else {
          this.toastr.error(data.responseMessage, 'Error');
        }

      });
    }

  }

  onNavigateClick(url: string, tabNo: any) {
    // this.selectedTab = tabNo;
    // $("html,body #website").animate(
    //   { scrollTop: $("#" + url).offset().top },
    //   500
    // );
  }

}
