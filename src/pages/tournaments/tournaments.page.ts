import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import {  TeamsPage } from '../pages';
import { FootballApiService } from '../../shared/shared';


@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.page.html',
})
export class TournamentsPage {

  tournaments: any;

  constructor(public nav: NavController,
    public navParams: NavParams,
    private footballApi: FootballApiService,
    private loadingController: LoadingController) {
  }

  itemTapped($event, tourney) {
    this.nav.push(TeamsPage, tourney);
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournaments...'
    });
    loader.present().then(() => {
      this.footballApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      });

    });


  }

 
}
