import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../validators/MustMatch";
import {HttpClient} from "@angular/common/http";
import ApiUrl from "../../environments/apiurl";
import {MessageService} from "primeng/api";
import UserDTO from "../models/UserDTO";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registration: FormGroup;
  visibility = false;

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private messageService: MessageService) {
    this.registration = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatedPassword: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', Validators.email]
    }, {
      validator: MustMatch('password', 'repeatedPassword')
    });
  }

  ngOnInit(): void {

  }

  visibility_change() {
    this.visibility ? this.visibility = false : this.visibility = true;
  }

  register() {
    let email = null;
    if (this.registration.get("email").value !== "")
      email = this.registration.get("email").value;
    let userDto: UserDTO = {
      login: this.registration.get("login").value,
      password: this.registration.get("password").value,
      email: email
    }
    this.http.post(ApiUrl + "/authorize/register", userDto)
      .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Udało się!',
            detail: "Pomyślnie utworzono konto spróbuj się zalogować."
          });
          this.registration.reset();
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Nastąpił błąd!',
            detail: error.error
          });
        });
  }
}
