import {Component, Input, OnInit} from '@angular/core';
import {RecipeDetail} from "../models/Recipe";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  @Input("recipe") recipe: RecipeDetail;

  constructor() {
  }

  ngOnInit(): void {
  }
}
