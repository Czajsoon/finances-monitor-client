import {Injectable} from '@angular/core';
import {PaymentMethodService} from "./payment-method.service";
import {ShopMethodService} from "./shop-method.service";

@Injectable({
  providedIn: 'root'
})
export class DefaultValuesRaportService {

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

  constructor() {}

  get colors() {
    return this._colors;
  }

}
