import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';
import {Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin;

  constructor(private formBuilder: FormBuilder) {

    this.formLogin = new FormGroup(
      {
        email: new FormControl(''),
        password: new FormControl('')
      });

  }

  ngOnInit() {
    console.log('Hola');
  }

  onSubmit(customerData) {
   console.log(customerData);
  }
}
