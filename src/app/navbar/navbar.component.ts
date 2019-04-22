import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnChanges  {

  loggedIn = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn = this.authService.loggedIn();
  }

  ngOnChanges() {
    this.loggedIn = this.authService.loggedIn();
  }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
