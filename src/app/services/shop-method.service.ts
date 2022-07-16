import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login.service";
import ApiUrl from "../../environments/apiurl";

@Injectable({
  providedIn: 'root'
})
export class ShopMethodService {
  private readonly servicePath: string = ApiUrl + "/shop-method"

  constructor(private http: HttpClient,
              private loginService: LoginService) {
  }

  getAll() {
    return this.http.get(this.servicePath + "/" + this.loginService._user.id);
  }

  getHistory() {
    return this.http.get(this.servicePath + "/history/" + this.loginService._user.id);
  }

  add(name: string) {
    return this.http.post(this.servicePath + "/" + this.loginService._user.id, {name: name})
  }

  delete(shopMethodId: string) {
    return this.http.delete(this.servicePath + "/" + this.loginService._user.id + "/" + shopMethodId);
  }

  edit(shopMethodId: string, name: string) {
    return this.http.patch(this.servicePath, {shopMethodId: shopMethodId, name: name});
  }
}
