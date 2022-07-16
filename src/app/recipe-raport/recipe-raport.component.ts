import {Component, OnInit} from '@angular/core';
import {RecipeRaportService} from "../services/recipe-raport.service";
import {ShopMethodService} from "../services/shop-method.service";
import {PaymentMethodService} from "../services/payment-method.service";
import {SumUp} from "../models/SumUp";
import {ActivatedRoute, Router} from "@angular/router";
import {RaportService} from "../services/raport.service";
import {MonthRaport} from "../models/MonthRaport";
import {methodCallChecks} from "@angular/cdk/schematics";

@Component({
  selector: 'app-recipe-raport',
  templateUrl: './recipe-raport.component.html',
  styleUrls: ['./recipe-raport.component.scss']
})
export class RecipeRaportComponent implements OnInit {
  withPaymentMethodesData: any;
  monthRaport: MonthRaport = {paymentMethods:[],shopMethods:[],total:0};
  sumUpPayments: SumUp = {names: [], totalPrice: []};
  sumUpTypes: SumUp = {names: [], totalPrice: []};
  withTypeData: any;
  private _colors: string[] = [
    "#42A5F5",
    "#66BB6A",
    "#FFA726",
    "#26C6DA",
    "#7E57C2",
    "#8673A1",
    "#C7B446",
    "#6C6960",
    "#D36E70",
    "#31372B",
    "#3B3C36",
    "#2D572C",
    "#5B3A29",
    "#252850",
    "#7E7B52",
    "#9B111E",
    "#317F43",
    "#75151E",
    "#B32428",
    "#1E213D",
    "#E1CC4F",
    "#35682D",
    "#316650",
    "#497E76",
    "#4A192C",
    "#354D73"
  ];
  chartOptions: any;
  date: string = new Date(Date.now()).toLocaleDateString();


  constructor(private typeService: ShopMethodService,
              private raportService: RaportService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.date = params["date"]
      if(this.date.length < 10) this.date = "0" + this.date;
    })
  }

  ngOnInit(): void {
    this.loadRaport();
  }

  addRecipe(){
    this.router.navigate(["/twoje_wydatki/nowy-paragon"])
  }

  private loadRaport(){
    this.raportService.getMonthlyRaport(this.date).toPromise()
      .then((data:MonthRaport) =>{
        this.monthRaport = data;
        this.setUpPaymentChart();
        this.setUpTypeChart();
      })
  }

  private setUpPaymentChart() {

    this.withPaymentMethodesData = {
      datasets: [{
        data: [...this.monthRaport.paymentMethods.map(method => method.totalPrice)],
        backgroundColor: this._colors,
      }],
      labels: [...this.monthRaport.paymentMethods.map(method => method.name)]
    };
  }

  private setUpTypeChart() {
    this.withTypeData = {
      datasets: [{
        data: [...this.monthRaport.shopMethods.map(method => method.totalPrice)],
        backgroundColor: this._colors,
      }],
      labels: [...this.monthRaport.shopMethods.map(type => type.name.toString())]
    };
  }

}
