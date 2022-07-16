import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../services/recipe.service";
import {Recipe} from "../models/Recipe";
import PaymentMethod from "../models/PaymentMethod";
import Numbers from "../models/Numbers";
import {PaymentMethodService} from "../services/payment-method.service";
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import ShopMethod from "../models/ShopMethod";
import {ShopMethodService} from "../services/shop-method.service";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {

  // @ts-ignore
  recipeForm: FormGroup;
  public recipe: Recipe;
  public paymentMethods: PaymentMethod[];
  public shopMethods: ShopMethod[];
  public sums: Numbers[] = [];
  itemsMenu: MenuItem[];

  constructor(public recipeService: RecipeService,
              private router: Router,
              private paymentService: PaymentMethodService,
              private shopService: ShopMethodService,
              private toastService: ToastService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadPaymentMethods();
    this.loadShopMethods();
    this.setMenu();
  }

  removeProduct(i: number) {
    this.products.removeAt(i);
    this.deleteProductSums(i);
  }

  addProduct() {
    this.products.push(this.buildProduct());
    this.sums.push({sum: 0, price: 0, quantity: 0});
  }

  buildProduct() {
    return this.formBuilder.group({
      name: [null,[Validators.required]],
      quantity: [null,[Validators.required]],
      itemPrice: [null,[Validators.required]],
      sum: [0,[Validators.required]]
    })
  }

  modelChangeFn(e, index: number, name: string) {
    if (name == "price")
      this.sums[index].price = e;
    else
      this.sums[index].quantity = e;
    if (this.sums[index].quantity !== 0 && this.sums[index].price !== 0)
      this.sums[index].sum = this.sums[index].price * this.sums[index].quantity;
  }

  add() {
    this.recipeService.add(this.recipeForm.value)
      .subscribe(()=>{
          this.toastService.successToast('Dodano','Pomyślnie dodano paragon!')
          this.recipeForm.reset();
          this.products.clear();
        },
        error => this.toastService.errorToast('Błąd',error.error))
  }

  get products() {
    return this.recipeForm.get('products') as FormArray;
  }

  private loadPaymentMethods() {
    this.paymentService.getAll()
      .subscribe((data: PaymentMethod[]) => {
        this.paymentMethods = data
      })
  }

  private loadShopMethods() {
    this.shopService.getAll().subscribe(
      (data: ShopMethod[]) => {
        this.shopMethods = data;
      }
    );
  }

  private buildForm() {
    this.recipeForm = this.formBuilder.group({
      date: [null,[Validators.required]],
      paymentMethod: [null,[Validators.required]],
      shopMethod: [null,Validators.required],
      products: this.formBuilder.array([])
    })
  }

  private deleteProductSums(index: number) {
    if (this.sums.length === 1) {
      this.sums.pop();
    } else if (this.sums.length > 1) {
      this.sums.splice(index, 1)
    }
  }

  private setMenu() {
    this.itemsMenu = [
      {
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(["/twoje_wydatki"])
        },
      },
      {
        icon: 'pi pi-shopping-cart',
        tooltip: "Dodaj formę płatności",
        command: () => {
          this.router.navigate(["/twoje_wydatki/typ_zakupów"])
        },
      },
      {
        icon: 'pi pi-wallet',
        command: () => {
          this.router.navigate(["/twoje_wydatki/forma_płatości"])
        },
      }
    ];
  }
}
