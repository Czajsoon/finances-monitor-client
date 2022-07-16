import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "./login.service";
import ApiUrl from "../../environments/apiurl";

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private readonly servicePath: string = ApiUrl + "/payment-method"

  constructor(private http: HttpClient,
              private loginService: LoginService) {
  }

  getAll() {
    return this.http.get(this.servicePath + "/" + this.loginService._user.id);
  }

  getHistory(){
    return this.http.get(this.servicePath + "/history/" + this.loginService._user.id);
  }

  delete(paymentMethodId: string) {
    return this.http.delete(this.servicePath + "/" + this.loginService._user.id + "/" + paymentMethodId);
  }

  add(name: string) {
    return this.http.post(this.servicePath + "/" + this.loginService._user.id, {name: name});
  }

  edit(paymentMethodId: string, name: string) {
    return this.http.patch(this.servicePath, {paymentMethodId: paymentMethodId, name: name});
  }
}
