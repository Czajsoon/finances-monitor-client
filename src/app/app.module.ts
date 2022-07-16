import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ContactComponent} from './contact/contact.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './settings/settings.component';
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CardModule} from "primeng/card";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DialogModule} from "primeng/dialog";
import {DividerModule} from "primeng/divider";
import {MenuModule} from "primeng/menu";
import {SpeedDialModule} from "primeng/speeddial";
import {CalendarModule} from "primeng/calendar";
import {PaginatorModule} from "primeng/paginator";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {AutoCompleteModule} from "primeng/autocomplete";
import {NewRecipeComponent} from './new-recipe/new-recipe.component';
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {PaymentMethodComponent} from './payment-method/payment-method.component';
import {TabMenuModule} from "primeng/tabmenu";
import {RecipeTypesComponent} from './recipe-types/recipe-types.component';
import {RecipeRaportComponent} from './recipe-raport/recipe-raport.component';
import {ChartModule} from "primeng/chart";
import {StyleClassModule} from "primeng/styleclass";
import {HttpClientModule} from "@angular/common/http";
import {LoginService} from "./services/login.service";
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ContactComponent,
    DashboardComponent,
    SettingsComponent,
    RecipeDetailsComponent,
    NewRecipeComponent,
    PaymentMethodComponent,
    RecipeTypesComponent,
    RecipeRaportComponent,
    RecipeEditComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
    BrowserModule,
    BrowserAnimationsModule,
    RippleModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
    CardModule,
    InputTextareaModule,
    DialogModule,
    DividerModule,
    MenuModule,
    SpeedDialModule,
    CalendarModule,
    FormsModule,
    PaginatorModule,
    TableModule,
    TagModule,
    AutoCompleteModule,
    ConfirmPopupModule,
    TabMenuModule,
    ChartModule,
    HttpClientModule,
    StyleClassModule
  ],
  providers: [LoginService, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
