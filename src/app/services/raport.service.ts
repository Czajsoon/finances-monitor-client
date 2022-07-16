import { Injectable } from '@angular/core';
import ApiUrl from "../../environments/apiurl";
import {LoginService} from "./login.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RaportService {
  private readonly servicePath: string = ApiUrl + "/raport"

  constructor(private loginService: LoginService,
              private http: HttpClient
  ) { }

  public getGeneralRaport(month:Date){
    return this.http.post(this.servicePath + "/general",{userId:this.loginService._user.id,month: this.parseDate(month)});
  }

  public getMonthlyRaport(month:string){
    return this.http.post(this.servicePath +"/month",{userId: this.loginService._user.id,date: month});
  }

  parseDate(date:Date){
    let dateString = date.toLocaleDateString();
    let years = dateString.substring(dateString.length-4,dateString.length);
    let month = dateString.substring(dateString.length-7,dateString.length-5);
    return years + "-" + month + "-01";
  }
}
