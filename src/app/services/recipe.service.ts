import {Injectable} from '@angular/core';
import {LoginService} from "./login.service";
import ApiUrl from "../../environments/apiurl";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly servicePath: string = ApiUrl + "/recipe"
  private readonly servicesPath: string = ApiUrl + "/recipe/all"

  constructor(private loginService: LoginService,
              private http: HttpClient) {
  }

  getAll(page: number,date: Date){
    return this.http.get(this.servicesPath + "/" + this.loginService._user.id + "?page=" + page + "&month=" + this.parseDate(date));
  }

  get(recipeId:string){
    return this.http.get(this.servicePath + "/" + recipeId);
  }

  delete(recipeId: string) {
    return this.http.delete(this.servicePath + "/" + recipeId);
  }

  edit(recipe){
    let date;
    if((recipe.date.getDate()) < 10) date = "0" + recipe.date.toLocaleString()
    else date = recipe.date.toLocaleString()
    let editedRecipe = {
      recipeId: recipe.id,
      dateTime: date,
      paymentMethod: recipe.paymentMethod.name,
      shopMethod: recipe.shopMethod.name,
      items: recipe.products
    }
    return this.http.patch(this.servicePath,editedRecipe);
  }

  add(recipe){
    let date;
    if((recipe.date.getDate()) < 10) date = "0" + recipe.date.toLocaleString()
    else date = recipe.date.toLocaleString()
    let newRecipe = {
      date: date,
      items: recipe.products,
      paymentMethod: recipe.paymentMethod.name,
      shopMethod: recipe.shopMethod.name,
      userId: this.loginService._user.id
    }
    return this.http.post(this.servicePath,newRecipe);
  }

  parseDate(date:Date){
    let dateString = date.toLocaleDateString();
    let years = dateString.substring(dateString.length-4,dateString.length);
    let month = dateString.substring(dateString.length-7,dateString.length-5);
    return years + "-" + month + "-01";
  }
}
