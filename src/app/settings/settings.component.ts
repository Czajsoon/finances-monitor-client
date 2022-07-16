import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {MustMatch} from "../validators/MustMatch";
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../services/settings.service";
import UserCommand from "../models/UserCommand";
import ApiUrl from "../../environments/apiurl";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [MessageService]
})
export class SettingsComponent implements OnInit {

  private url = ApiUrl + "/authorize/edit";
  settingsGroup: FormGroup;
  passwordChange: FormGroup;
  displayBasic: boolean = false;
  visibility = false;
  visibility1 = false;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private http: HttpClient) {
    this.settingsGroup = this.buildFormSettings();
    this.passwordChange = this.buildFormPassword();
  }

  ngOnInit(): void {
  }

  private buildFormSettings(): FormGroup {
    return this.fb.group({
      login: [this.loginService.login, [Validators.required, Validators.minLength(5)]],
      firstName: [this.loginService.name, [Validators.required, Validators.minLength(3)]],
      lastName: [this.loginService.surname, [Validators.required, Validators.minLength(2)]],
      email: [this.loginService.email]
    })
  }

  private buildFormPassword(): FormGroup {
    return this.fb.group({
      oldPassword: ['',[Validators.required,Validators.minLength(8)]],
      newPassword: ['',[Validators.required,Validators.minLength(8)]],
      newRepeatedPassword: ['',[Validators.required,Validators.minLength(8)]]
    },{
      validator: MustMatch('newPassword','newRepeatedPassword')
    })
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  visibility_change() {
    this.visibility ? this.visibility = false : this.visibility = true;
  }

  visibility_change1() {
    this.visibility1 ? this.visibility1 = false : this.visibility1 = true;
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Czy akceptujesz zmiany? ' +
        'login: ' + this.settingsGroup.get('login')?.value + ',\n' +
        'Imię: ' + this.settingsGroup.get('firstName')?.value + ',\n' +
        'Nazwisko: ' + this.settingsGroup.get('lastName')?.value + ',\n' +
        'email: ' + this.settingsGroup.get('email')?.value + '.',
      header: 'Akceptacja zmian ustawień konta',
      icon: 'pi pi-question',
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      accept: () => {
        this.http.patch(this.url, this.setUpUserCommandForDataChange()).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Zmiany zaakceptowane',
            detail: 'Zmiany zostały zapisane!'
          });
          this.loginService.updateProfile(this.setUpUserCommandForDataChange());
        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Nastąpił błąd!',
            detail: error.error
          });
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'info',
              summary: 'Zmiany odrzucone',
              detail: 'Odrzucono wprowadzone zmiany'
            });
            this.settingsGroup.setValue({
              login: this.loginService.login,
              firstName: this.loginService.name,
              lastName: this.loginService.surname,
              email: this.loginService.email
            })
            break;
        }
      }
    });
  }

  confirmPasswordChange(){
    this.confirmationService.confirm({
      message: 'Czy napewno chcesz zmienić hasło?',
      header: 'Zmiana hasła',
      icon: 'pi pi-question',
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      accept: () => {
        this.http.patch(this.url, this.setUpUserCommandForPasswordChange())
          .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Zmiany zaakceptowane',
            detail: 'Hasło zostało zmienione!'
          });
        }, error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Nastąpił błąd!',
            detail: error.error
          });
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'info',
              summary: 'Zmiany odrzucone',
              detail: 'Odrzucono zmienę hasła'
            });
            break;
        }
      }
    });
  }

  setUpUserCommandForDataChange(): UserCommand{
    let login = null;
    let firstName =null;
    let lastName = null;
    let email = null;
    if(this.settingsGroup.get("login").value != this.loginService._user.login)
      login = this.settingsGroup.get("login").value;
    if(this.settingsGroup.get("firstName").value != this.loginService._user.login)
      firstName = this.settingsGroup.get("firstName").value;
    if(this.settingsGroup.get("lastName").value != this.loginService._user.login)
      lastName = this.settingsGroup.get("lastName").value;
    if(this.settingsGroup.get("email").value != this.loginService._user.login)
      email = this.settingsGroup.get("email").value;
    return  {
      userLogin: this.loginService._user.login,
      userId: this.loginService._user.id,
      login: login,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: null,
      userPassword: null
    }
  }

  setUpUserCommandForPasswordChange(): UserCommand{
    let password = this.passwordChange.get("oldPassword").value;
    let newPassword = this.passwordChange.get("newPassword").value;
    return  {
      userLogin: this.loginService._user.login,
      userId: this.loginService._user.id,
      login: null,
      firstName: null,
      lastName: null,
      email: null,
      password: newPassword,
      userPassword: password
    }
  }
}
