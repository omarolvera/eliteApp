import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FootballApiService } from '../../shared/shared';
import { TeamHomePage, MapPage } from '../pages';
declare var window: any;



@Component({
  selector: 'page-editTournament',
  templateUrl: 'editTournament.page.html',
})
export class EditTournamentPage {
model: any={};
  

  constructor(public nav: NavController, public navParams: NavParams, private footballApi: FootballApiService) {
  }

  ionViewDidLoad() {
    // this.game = this.navParams.data;
    // this.game.gameTime = Date.parse(this.game.time);
  }


  saveTournament(){
    //add new tournament
  }


}