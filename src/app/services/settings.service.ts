import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login.service";
import UserCommand from "../models/UserCommand";
import ApiUrl from "../../environments/apiurl";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {



  constructor(private http: HttpClient,
              private loginService: LoginService,
              private messageService: MessageService) { }

  performChangeUserInfo(command: UserCommand) {

  }


  performChangeUserPassword(command: UserCommand){

  }
}
