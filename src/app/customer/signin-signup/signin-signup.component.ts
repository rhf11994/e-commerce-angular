import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSignupService } from 'src/app/admin/services/login-signup.service';
import { User } from 'src/app/core/models/object-model';

@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.css'],
})
export class SigninSignupComponent implements OnInit {
  regForm: Boolean = false;
  signUpform!: FormGroup;
  signInform!: FormGroup;
  signUpsubmitted = false;
  href: String = '';
  user_data: any;
  user_dto!: User;
  user_reg_data: any;

  signInFormValue: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private logsign_service: LoginSignupService
  ) {}

  ngOnInit() {
    this.href = this.router.url;
    if (this.href == '/sign-up') {
      this.regForm = true;
    } else if (this.href == '/sign-in') {
      this.regForm = false;
    }

    this.signUpform = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      addLine1: ['', Validators.required],
      addLine2: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.signInform = this.formBuilder.group({});
  }

  get rf() {
    return this.signUpform.controls;
  }

  get name() {
    return this.signUpform.get('name')!;
  }

  get nickname() {
    return this.signUpform.get('nickname')!;
  }

  get email() {
    return this.signUpform.get('email')!;
  }

  get password() {
    return this.signUpform.get('password')!;
  }

  get mobNumber() {
    return this.signUpform.get('mobNumber')!;
  }
  get age() {
    return this.signUpform.get('age')!;
  }
  get dob() {
    return this.signUpform.get('age')!;
  }
  get addLine1() {
    return this.signUpform.get('addLine1')!;
  }
  get city() {
    return this.signUpform.get('city')!;
  }
  get state() {
    return this.signUpform.get('state')!;
  }
  get zipCode() {
    return this.signUpform.get('zipCode')!;
  }
  get language() {
    return this.signUpform.get('language')!;
  }
  get gender() {
    return this.signUpform.get('gender')!;
  }
  get aboutYou() {
    return this.signUpform.get('aboutYou')!;
  }
  get uploadPhoto() {
    return this.signUpform.get('uploadPhoto')!;
  }
  get agreetc() {
    return this.signUpform.get('agreetc')!;
  }
  get role() {
    return this.signUpform.get('role')!;
  }

  onSubmitSignUp() {
    this.signUpsubmitted = true;
    if (this.signUpform.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.signUpform.value))
      return;
    }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signUpform.value))
    // console.log(this.signUpform.value)
    this.user_reg_data = this.signUpform.value;
    this.user_dto = {
      aboutYou: this.user_reg_data.aboutYou,
      // addLine1: this.user_reg_data.addLine1,
      // addLine2: this.user_reg_data.addLine2,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      // city: this.user_reg_data.city,
      dob: this.user_reg_data.dob,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
      },
      language: this.user_reg_data.language,
      mobNumber: this.user_reg_data.mobNumber,
      name: this.user_reg_data.name,
      password: this.user_reg_data.password,
      // state: this.user_reg_data.state,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      // zipCode: this.user_reg_data.zipCode,
      role: this.user_reg_data.role,
    };
    this.logsign_service.userRegister(this.user_dto).subscribe(
      (data) => {
        // console.log(data);
        alert('Success');
        this.router.navigateByUrl('/sign-in');
      },
      (err) => {
        alert('Some Error Occured');
      }
    );
  }

  onSubmitSignIn() {
    this.logsign_service
      .authLogin(
        this.signInFormValue.userEmail,
        this.signInFormValue.userPassword
      )
      .subscribe(
        (data) => {
          this.user_data = data;
          if (this.user_data.length == 1) {
            sessionStorage.setItem('user_session_id', this.user_data[0].id);
            sessionStorage.setItem('role', this.user_data[0].role);
            this.router.navigateByUrl('/');
          } else {
            alert('Invalid');
          }
        },
        (error) => {
          console.log('My error', error);
        }
      );
  }
}
