import { Component, OnInit } from "@angular/core";
import { HeroService } from "../common/services/hero.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-find",
  templateUrl: "./find.component.html",
  styleUrls: ["./find.component.scss"],
})
export class FindComponent implements OnInit {
  hero: any = {};
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");

    this.heroService.getHero(id).subscribe((hero) => {
      this.hero = hero;
    });
  }
}
