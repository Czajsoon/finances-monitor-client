import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import routing from "../../environments/routing";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  home(){
    this.router.navigateByUrl(routing.home);
  }
}
