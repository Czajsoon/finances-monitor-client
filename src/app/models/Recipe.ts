import {DatePipe} from "@angular/common";
import PaymentMethod from "./PaymentMethod";
import ShopMethod from "./ShopMethod";

export interface Item {
  id: string;
  name: string;
  itemPrice: number;
  quantity: number;
}

export interface Recipe {
  id: string;
  dateTime: Date;
  paymentMethod: string;
  shopMethod: string;
  totalPrice: number;
  totalQuantity: number;
}

export interface RecipeDetail{
  id: string;
  dateTime: Date;
  paymentMethod: string;
  shopMethod: string;
  totalPrice: number;
  totalQuantity: number;
  items: Item[];
}

export interface Recipes {
  recipe: Recipe[];
  totalPages: number;
  totalElements: number;
}



