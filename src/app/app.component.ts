import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  constructor(private primengConfig: PrimeNGConfig,
              public auth: LoginService) {
  }

  title = 'householdfunds';

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
