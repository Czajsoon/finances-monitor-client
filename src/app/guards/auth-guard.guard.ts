import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../services/login.service";
import routing from "../../environments/routing";
import {ToastService} from "../services/toast.service";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private loginService: LoginService,
              private messageService: MessageService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.loginService.isLoggedIn()) {
      this.router.navigateByUrl(routing.home);
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Message Content'});
    }
    return this.loginService.isLoggedIn();
  }

}
