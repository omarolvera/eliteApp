import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FootballApiService } from '../../shared/shared';
import { TeamHomePage, MapPage } from '../pages';
declare var window: any;



@Component({
  selector: 'page-game',
  templateUrl: 'game.page.html',
})
export class GamePage {

  game: any = {};

  constructor(public nav: NavController, public navParams: NavParams, private footballApi: FootballApiService) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId) {
    let tourneyData = this.footballApi.getCurrentTourneyData();
    let team = tourneyData.teams.find(t => t.id == teamId);
    this.nav.push(TeamHomePage, team);
  }

  goToDirections() {
    let tourneyData = this.footballApi.getCurrentTourneyData();
    let location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`
  }

  goToMap() {
    this.nav.push(MapPage, this.game);
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2);
  }


}
