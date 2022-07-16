import {Injectable} from '@angular/core';
import User from "../models/User";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import ApiUrl from "../../environments/apiurl";
import urls from "../../environments/urls";
import UserCommand from "../models/UserCommand";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _user: User = null;
  private _logged: boolean = false;

  constructor(private http: HttpClient,
              private router: Router,
              private messageService: MessageService) {
  }

  performLogin(login: string, password: string) {

    this.http.post(ApiUrl + "/authorize/login",
      {login: login, password: password})
      .subscribe((response:User) => {
        this._user = response;
        this._logged = true;
        this.router.navigateByUrl(urls.dashboard)
      }, error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Nastąpił błąd!',
          detail: error.error
        });
      });
  }

  updateProfile(command: UserCommand){
    if(command.login != null)
      this._user.login = command.login;
    if(command.lastName != null)
      this._user.lastName = command.lastName;
    if(command.firstName != null)
      this._user.firstName = command.firstName;
    if(command.email != null)
      this._user.email = command.email;
  }

  get name() {
    return this._user.firstName;
  }

  get surname() {
    return this._user.lastName;
  }

  get login() {
    return this._user.login;
  }

  get email() {
    return this._user.email;
  }

  get logged() {
    return this._logged;
  }

  set logged(logged) {
    this._logged = logged;
  }

  isLoggedIn() {
    return !!this._user;
  }

  logOut() {
    this._logged = false;
    this._user = null;
    this.router.navigateByUrl(urls.home);
  }
}
