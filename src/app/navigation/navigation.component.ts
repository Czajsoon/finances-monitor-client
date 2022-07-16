import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import User from "../models/User";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() item: User;
  @Input() logged: boolean;

  constructor(public loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(["/logowanie"])
  }

  logOut() {
    this.loginService.logOut();
  }




}
