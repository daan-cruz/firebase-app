import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-app';
  authUser = null;

  constructor(private authService: AuthService,
              private route: Router) {
    if (this.authUser == null) {
      this.route.navigate(['login']);
      authService.getUserAuth().subscribe((auth) => {
        this.authUser = auth;
        if (auth != null) {
          this.route.navigate(['municipalities']);
        }
      });
    }
  }


  logout() {
    this.authService.logout().then(r => this.route.navigate(['login']));
  }

}
