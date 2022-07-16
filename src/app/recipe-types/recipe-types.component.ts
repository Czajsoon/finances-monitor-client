import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import ShopMethod from "../models/ShopMethod";
import {ShopMethodService} from "../services/shop-method.service";
import {ConfirmationService, MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-recipe-types',
  templateUrl: './recipe-types.component.html',
  styleUrls: ['./recipe-types.component.scss']
})
export class RecipeTypesComponent implements OnInit {
  shopMethod: FormGroup;
  shopMethods: ShopMethod[] = [];
  items: MenuItem[];
  actualShopName: string = "";

  constructor(private shopMethodService: ShopMethodService,
              private toastService: ToastService,
              private confirmationService: ConfirmationService,
              private fb: FormBuilder,
              private router: Router) {
    this.shopMethod = this.buildForm();
  }

  ngOnInit(): void {
    this.refresh();
    this.setMenu();
  }

  changeShopMethodNameEvent(e) {
    this.actualShopName = e.target.value;
  }

  refresh(){
    this.shopMethodService.getAll().subscribe(
      (data:ShopMethod[]) =>{
        this.shopMethods = data;
      }
    );
  }

  add() {
    let name = this.shopMethod.get('name').value;
    this.shopMethodService.add(name)
      .subscribe(() => {
        this.toastService.successToast(
          'Dodano',
          'Pomyślnie dodano metodę zakupową: ' + name + "!"
        )
        this.refresh();
        this.shopMethod.reset();
      }, error => {
        this.toastService.errorToast(
          'Nie dodano',
          error.error
        )
      });
  }

  delete(shopMethodId: string){
    this.shopMethodService.delete(shopMethodId)
      .subscribe(() => {
        this.toastService.successToast(
          'Usunięto',
          'Pomyślnie usunięto metodę zakupową!'
        )
        this.refresh();
        this.shopMethod.reset();
      }, error => {
        this.toastService.errorToast(
          'Nie dodano',
          error.error
        )
      })
  }

  deleteShopMethod(shopMethodId: string) {
    this.confirmationService.confirm({
      target: event.target,
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      message: 'Jesteś pewien że chcesz usunąć typ zakupów?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(shopMethodId);
      },
    });

  }

  edit(shopMethodId: string){
    this.shopMethodService.edit(shopMethodId, this.actualShopName)
      .subscribe(() => {
        this.toastService.successToast(
          'Zaktualizowano',
          'Pomyślnie zmianiono metodę zakupową!'
        )
        this.refresh();
      }, error => {
        this.toastService.errorToast(
          'Nie zmianiono metody płatności',
          error.error
        )
      });
  }

  private buildForm() {
    return this.shopMethod = this.fb.group({
      name: ['', [Validators.required]]
    })
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
        tooltip: "Dodaj paragon"
      },
      {
        icon: 'pi pi-wallet',
        tooltip: "Dodaj formę płatności",
        command: () => {
          this.router.navigate(["/twoje_wydatki/forma_płatości"])
        },
      },
    ];
  }
}
