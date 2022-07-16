import {Injectable} from '@angular/core';
import {DefaultValuesRaportService} from "./default-values-raport.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeRaportService {

  private _colors: string[] = [];
  private _typeNumbers: number[] = [60, 102];//todo z backendu
  private _paymentNumbers: number[] = [70, 92];
  private _date: Date = new Date(Date.now());

  constructor(private defaultValues: DefaultValuesRaportService) {
    this.setUpAll();
  }

  private setUpAll() {
    this._colors = this.defaultValues.colors;
  }

  refresh(){
    this.setUpAll();
  }

  get date() {
    return this._date;
  }

  set date(date:Date){
    this._date = date;
  }

  get paymentNumbers() {
    return this._paymentNumbers;
  }

  get typeNumbers() {
    return this._typeNumbers;
  }

  get colors() {
    return this._colors;
  }

}
