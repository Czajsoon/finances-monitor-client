import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import PaymentMethod from "../models/PaymentMethod";
import {Recipe, RecipeDetail, Recipes} from "../models/Recipe";
import {RecipeService} from "../services/recipe.service";
import {Router} from "@angular/router";
import {PaymentMethodService} from "../services/payment-method.service";
import ShopMethod from "../models/ShopMethod";
import {ShopMethodService} from "../services/shop-method.service";
import {RecipeRaportService} from "../services/recipe-raport.service";
import {ToastService} from "../services/toast.service";
import {RaportService} from "../services/raport.service";
import GeneralRaport from "../models/GeneralRaport";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  daysGone: number;
  generalRaport: GeneralRaport = {thisMonth:0,lastMonth:0};
  displayModal: boolean;
  displayRecipeDetails: boolean;
  items: MenuItem[];
  paymentMethods: PaymentMethod[];
  shopMethods: ShopMethod[];
  today:Date =  new Date(Date.now());
  pickedDate: Date;
  pickedMonth: Date = new Date(Date.now());
  pickedMonthMemo: Date = new Date(Date.now());
  recipes: Recipe[] = [];
  totalRecords: number;
  recipeDetailId: RecipeDetail = {
    dateTime: new Date(Date.now()),
    id: "",
    items: [],
    paymentMethod: null,
    shopMethod: null,
    totalPrice: 0,
    totalQuantity: 0
  };
  page = 0;
  totalPages: number;

  constructor(private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private toastService: ToastService,
              private recipeService: RecipeService,
              private paymentService: PaymentMethodService,
              private raportService: RaportService,
              private shopMethodService: ShopMethodService,
              private recipeRaportService: RecipeRaportService,
              private router: Router) {
    this.pickedMonthMemo = new Date(Date.now())
  }

  ngOnInit(): void {
    this.setAll();
  }


  public refresh(page: number){
    this.recipeService.getAll(page,this.pickedMonth).subscribe(
      (data:Recipes) =>{
        this.pickedMonthMemo = this.pickedMonth;
        this.recipes = data.recipe;
        this.totalRecords = data.totalElements;
        this.totalPages = data.totalPages;
        this.getGeneralRaport();
        this.loadPaymentMethods();
        this.loadShopMethods();
      }
    );
  }

  public getGeneralRaport(){
    this.raportService.getGeneralRaport(this.pickedMonth)
      .subscribe(
        (data:GeneralRaport) =>{
          this.generalRaport = data;
        }
      )
  }

  public isFirstPage(){
    return this.recipes ? this.page === 0 : true;
  }

  public isLastPage(){
    return this.page === this.totalPages-1;
  }

  showRecipeDetails(recipeId:string){
    this.recipeService.get(recipeId).subscribe(
      (data:RecipeDetail) =>{
        this.recipeDetailId = data;
      },
      error => this.toastService.errorToast("Błąd",error.error)
    );
    this.displayRecipeDetails = true;
  }

  next() {
    if(!this.isLastPage()) {
      this.page = this.page + 1;
      this.refresh(this.page);
    }
  }

  prev() {
    if(!this.isFirstPage()){
      this.page = this.page - 1;
      this.refresh(this.page);
    }

  }

  private loadPaymentMethods(){
    this.paymentService.getHistory()
      .subscribe((data: PaymentMethod[]) => {
        this.paymentMethods = data
      })
  }

  private loadShopMethods(){
    this.shopMethodService.getHistory().subscribe(
      (data:ShopMethod[]) =>{
        this.shopMethods = data;
      }
    );
  }

  private setAll() {
    this.refresh(0);
    this.loadPaymentMethods();
    this.loadShopMethods();
    this.daysGone = new Date(Date.now()).getDate();
    this.setMenu();
  }

  private delete(recipeId: string){
    this.recipeService.delete(recipeId)
      .subscribe(()=>{
        this.toastService.successToast('Usunięto','Pomyślnie usunięto paragon!')
        this.refresh(0);
        },
        error => this.toastService.errorToast('Błąd',error.error))
  }

  deleteRecipe(event: Event, recipeId: string) {
    this.confirmationService.confirm({
      target: event.target,
      acceptLabel: "Tak",
      rejectLabel: "Nie",
      message: 'Jesteś pewien że chcesz usunąć ten paragon?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.delete(recipeId);
      },
    });
  }

  generateRaport(){
    this.router.navigate(["/twoje_wydatki/raport",this.pickedDate.toLocaleDateString()]);
  }

  editRecipe(recipe: Recipe) {
    this.router.navigate(["/twoje_wydatki/paragon",recipe.id]);
  }

  addRecipe(){
    this.router.navigate(["/twoje_wydatki/nowy-paragon"])
  }

  private setMenu() {
    this.items = [
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
      {
        icon: 'pi pi-shopping-cart',
        command: () => {
          this.router.navigate(["/twoje_wydatki/typ_zakupów"])
        },
      },
      {
        icon: 'pi pi-briefcase',
        command: () => {
          this.displayModal = true;
        },
      }
    ];
  }

}
