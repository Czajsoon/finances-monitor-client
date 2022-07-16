import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService,) { }

  successToast(summary: string, detail: string) {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail
    });
  }

  errorToast(summary: string, detail: string){
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail
    });
  }
}
