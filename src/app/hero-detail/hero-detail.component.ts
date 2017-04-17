import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import 'rxjs/add/operator/switchMap';

import { Hero } from '../hero';
import { HeroService } from "../hero.service";

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  providers: [HeroService]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heroService: HeroService, private location: Location, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.routes.params.switchMap((params: Params) => this.heroService.getHero(+params['id']))
    .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.update(this.hero).
    then(() => this.goBack());
  }

}
