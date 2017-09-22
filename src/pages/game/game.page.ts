import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { FootballApiService } from '../../shared/shared';
import { TeamHomePage } from '../pages';




@Component({
  selector: 'page-game',
  templateUrl: 'game.page.html',
})
export class GamePage {
  
  game: any={};

  constructor(public nav: NavController, public navParams: NavParams, private footballApi:FootballApiService) {
  }

  ionViewDidLoad() {
    this.game= this.navParams.data;
  }

  teamTapped(teamId){
let tourneyData= this.footballApi.getCurrentTourneyData();
let team= tourneyData.teams.find(t => t.id == teamId);
this.nav.push(TeamHomePage, team);
  }

}
