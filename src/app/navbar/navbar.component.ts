import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  user:any='';
  constructor(public _authenticationService: AuthService)  { }

  ngOnInit(): void {
    
    this.user=sessionStorage.getItem("name")
  }
  logout() {
    this._authenticationService.logout();
  }
  
}
