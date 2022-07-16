import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import PaymentMethod from "../models/PaymentMethod";
import Numbers from "../models/Numbers";
import {Item, RecipeDetail} from "../models/Recipe";
import {RecipeService} from "../services/recipe.service";
import {PaymentMethodService} from "../services/payment-method.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import ShopMethod from "../models/ShopMethod";
import {MenuItem} from "primeng/api";
import {ShopMethodService} from "../services/shop-method.service";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  public paymentMethods: PaymentMethod[] = [];
  public shopMethods: ShopMethod[];
  public sums: Numbers[] = [];
  itemsMenu: MenuItem[];
  recipe: RecipeDetail = {
    dateTime: new Date(Date.now()),
    id: "",
    items: [],
    paymentMethod: "",
    shopMethod: "",
    totalPrice: 0,
    totalQuantity: 0
  };
  recipeId: string;

  constructor(public recipeService: RecipeService,
              private router: Router,
              private paymentService: PaymentMethodService,
              private shopService: ShopMethodService,
              private toastService: ToastService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.route.params.subscribe(params => this.recipeId = params["id"])
  }

  ngOnInit(): void {
    this.loadPaymentMethods();
    this.buildForm();
    this.setMenu();
  }

  getRecipe() {
    this.recipeService.get(this.recipeId)
      .subscribe((data: RecipeDetail) => {
        this.recipe = data;
        this.buildProducts(this.recipe.items);
        this.setMethods();
      }, error => this.toastService.errorToast('Błąd', error.error))
  }

  private setMethods() {
    this.recipeForm.get('date').setValue(new Date(this.recipe.dateTime))
    this.recipeForm.get('id').setValue(this.recipe.id);
    this.recipeForm.get("paymentMethod").setValue(
      this.paymentMethods.find(
        paymentMethod => paymentMethod.name === this.recipe.paymentMethod));
    this.recipeForm.get("shopMethod").setValue(
      this.shopMethods.find(
        shopMethod => shopMethod.name === this.recipe.shopMethod));
  }


  removeProduct(i: number) {
    this.products.removeAt(i);
    this.deleteProductSums(i);
  }

  addProduct() {
    this.products.push(this.buildAddProduct());
    this.sums.push({sum: 0, price: 0, quantity: 0});
  }

  addItemProduct(item: Item) {
    this.products.push(this.buildProduct(item));
    this.sums.push({sum: item.itemPrice * item.quantity, price: item.itemPrice, quantity: item.quantity});
  }

  buildProducts(items: Item[]) {
    items.forEach(item => this.addItemProduct(item));
  }

  buildProduct(item: Item) {
    return this.formBuilder.group({
      name: [item.name, [Validators.required]],
      quantity: [item.quantity, [Validators.required]],
      itemPrice: [item.itemPrice, [Validators.required]],
      sum: [item.quantity * item.itemPrice, [Validators.required]]
    })
  }

  buildAddProduct() {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      itemPrice: [null, [Validators.required]],
      sum: [0, [Validators.required]]
    })
  }

  private buildForm() {

    this.recipeForm = this.formBuilder.group({
      id: "",
      date: [new Date(this.recipe.dateTime), [Validators.required]],
      paymentMethod: [this.recipe.paymentMethod, [Validators.required]],
      shopMethod: [this.recipe.shopMethod, Validators.required],
      products: this.formBuilder.array([])
    })
  }

  get date() {
    return this.recipeForm.get("date");
  }

  modelChangeFn(e, index: number, name: string) {
    if (name == "price")
      this.sums[index].price = e;
    else
      this.sums[index].quantity = e;
    if (this.sums[index].quantity !== 0 && this.sums[index].price !== 0)
      this.sums[index].sum = this.sums[index].price * this.sums[index].quantity;
  }

  edit() {
    this.recipeService.edit(this.recipeForm.value)
      .subscribe(() => {
        this.toastService.successToast("", "Pomyślnie zmieniono Paragon!");
      }, error => this.toastService.errorToast("Błąd", error.error));
  }

  get products() {
    return this.recipeForm.get('products') as FormArray;
  }

  private loadPaymentMethods() {
    this.paymentService.getAll().toPromise().then(
      (data: PaymentMethod[]) => {
        this.paymentMethods = data;
        this.loadShopMethods()
      })
  }

  private loadShopMethods() {
    this.shopService.getAll().toPromise().then(
      (data: ShopMethod[]) => {
        this.shopMethods = data;
        this.getRecipe();
      }
    );
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
