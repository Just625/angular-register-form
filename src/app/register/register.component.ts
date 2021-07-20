import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Account} from '../account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  successMsg: string;
  id = 1;
  accountList: Account[] = [];
  countries: string[] = ['VN', 'USA', 'JP', 'SG'];
  genders: string[] = ['Male', 'Female', 'Other'];
  registerForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      pwGroup: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('')
      }, this.comparePassword),
      country: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(18)]),
      gender: new FormControl('', [Validators.required]),
      phone: new FormControl('', [this.checkPhoneRegex])
    });
  }

  onSubmit() {
    if (this.registerForm.status === 'VALID') {
      const account: Account = this.registerForm.value;
      account.password = this.registerForm.value.pwGroup.password;
      // @ts-ignore
      delete account.pwGroup;
      account.id = this.id;
      this.id++;
      this.accountList.push(account);
      console.log(this.accountList);
      this.successMsg = 'Register success!';
    }
  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return (v.password === v.confirmPassword) ? null : {passwordnotmatch: true};
  }

  checkPhoneRegex(c: AbstractControl) {
    const v = c.value;
    const regex = '^\\+84\\d{9,10}$';
    return (v.match(regex) !== null) ? null : {phonenotmatch: true};
  }
}
