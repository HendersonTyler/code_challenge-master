import { Component, OnInit } from "@angular/core";
import { HeroService } from "../common/services/hero.service";

import Hero from "../models/Hero";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  shortText(array) {
    return array;
  }
}
