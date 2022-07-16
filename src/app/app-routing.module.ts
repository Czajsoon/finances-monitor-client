import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ContactComponent} from "./contact/contact.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SettingsComponent} from "./settings/settings.component";
import {RegisterComponent} from "./register/register.component";
import {NewRecipeComponent} from "./new-recipe/new-recipe.component";
import {PaymentMethodComponent} from "./payment-method/payment-method.component";
import {RecipeTypesComponent} from "./recipe-types/recipe-types.component";
import {RecipeRaportComponent} from "./recipe-raport/recipe-raport.component";
import urls from "../environments/urls";
import routing from "../environments/routing";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuardGuard} from "./guards/auth-guard.guard";

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: urls.home},
  {path: routing.home, component: HomeComponent},
  {path: routing.login, component: LoginComponent},
  {path: routing.contact, component: ContactComponent},
  {path: routing.dashboard, component: DashboardComponent, canActivate: [AuthGuardGuard]},
  {path: routing.settings, component: SettingsComponent, canActivate: [AuthGuardGuard]},
  {path: routing.register, component: RegisterComponent},
  {path: routing.recipe + "/:id", component: RecipeEditComponent, canActivate: [AuthGuardGuard]},
  {path: routing.new_recipe, component: NewRecipeComponent, canActivate: [AuthGuardGuard]},
  {path: routing.payment_method, component: PaymentMethodComponent, canActivate: [AuthGuardGuard]},
  {path: routing.recipe_type, component: RecipeTypesComponent, canActivate: [AuthGuardGuard]},
  {path: routing.recipe_raport + "/:date", component: RecipeRaportComponent, canActivate: [AuthGuardGuard]},
  {path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
