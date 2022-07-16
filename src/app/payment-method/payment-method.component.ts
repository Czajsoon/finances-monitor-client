import {Component, OnInit} from '@angular/core';
import {PaymentMethodService} from "../services/payment-method.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import PaymentMethod from "../models/PaymentMethod";
import {ConfirmationService, MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {
  items: MenuItem[];
  paymentMethod: FormGroup;
  paymentMethods: PaymentMethod[] = [];
  actualPaymentName: string = "";

  constructor(private paymentService: PaymentMethodService,
              private toastService: ToastService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private router: Router) {
    this.paymentMethod = this.buildForm();
  }

  ngOnInit(): void {
    this.refresh();
    this.setMenu();
  }

  changePaymentMethodNameEvent(e) {
    this.actualPaymentName = e.target.value;
  }

  refresh() {
    this.paymentService.getAll()
      .subscribe((data: PaymentMethod[]) => {
        this.paymentMethods = data
      })

  }

  add() {
    let name = this.paymentMethod.get('name').value;
    this.paymentService.add(name)
      .subscribe(() => {
        this.toastService.successToast(
          'Dodano',
          'Pomyślnie dodano metodę płatności: ' + name + "!"
        )
        this.refresh();
        this.paymentMethod.reset();
      }, error => {
        this.toastService.errorToast(
          'Nie dodano',
          error.error
        )
      });
  }

  delete(paymentMethodId: string){
    this.paymentService.delete(paymentMethodId)
      .subscribe(() => {
        this.toastService.successToast(
          'Usunięto',
          'Pomyślnie usunięto metodę płatności!'
        )
        this.refresh();
        this.paymentMethod.reset();
      }, error => {
        this.toastService.errorToast(
          'Nie dodano',
          error.error
        )
      })
  }

  deletePaymentMethod(paymentMethodId: string) {
    this.confirmationService.confirm({
      target: event.target,
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      message: 'Jesteś pewien że chcesz usunąć typ zakupów?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(paymentMethodId);
      },
    });

  }

  edit(paymentMethodId: string) {
    this.paymentService.edit(paymentMethodId, this.actualPaymentName)
      .subscribe(() => {
        this.toastService.successToast(
          'Zaktualizowano',
          'Pomyślnie zmianiono metodę płatności!'
        )
        this.refresh();
      }, error => {
        this.toastService.errorToast(
          'Nie zmianiono metody płatności',
          error.error
        )
      });
  }

  private setMenu() {
    this.items = [
      {
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(["/twoje_wydatki"])
        },
      },
      {
        icon: 'pi pi-plus',
        command: () => {
          this.router.navigate(["/twoje_wydatki/nowy-paragon"])
        },
      },
      {
        icon: 'pi pi-shopping-cart',
        command: () => {
          this.router.navigate(["/twoje_wydatki/typ_zakupów"])
        },
      }
    ];
  }

  private buildForm() {
    return this.paymentMethod = this.fb.group({
      name: ['', [Validators.required]]
    })
  }
}
