import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactGroup: FormGroup;

  constructor(private loginService: LoginService,
              private fb: FormBuilder,
              private messageService: MessageService) {
    this.contactGroup = this.buildForm();
  }

  ngOnInit(): void {
  }

  send(){
    this.messageService.add({severity:'success', summary: 'Wiadomość wysłana', detail: 'Pomyślnie wysłano wiadomość do administratora!'});
    this.contactGroup = this.buildForm();
  }

  buildForm() {
    if(this.loginService.isLoggedIn()){
      return this.contactGroup = this.fb.group({
        email: [this.loginService.email,[Validators.required,Validators.email]],
        topic: ['',[Validators.required,Validators.minLength(10)]],
        contents: ['',[Validators.required,Validators.maxLength(200)]]
      })
    }
    else{
      return this.contactGroup = this.fb.group({
        email: ['',[Validators.required,Validators.email]],
        topic: ['',[Validators.required,Validators.minLength(10)]],
        contents: ['',[Validators.required,Validators.maxLength(200)]]
      })
    }

  }

}
