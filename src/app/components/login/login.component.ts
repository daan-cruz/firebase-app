import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Validators, FormControl} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin;

  constructor(
  private authService: AuthService,
  private route: Router
  ) {

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
    console.log(customerData.email);
    this.authService.login(customerData.email, customerData.password).then(r => {
    this.route.navigate(['welcome']);
    }).catch(error => console.log(error));
  }
}
