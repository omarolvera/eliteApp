import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { StandingsPage, TeamDetailsPage, MyTeamspage } from '../pages';



@Component({

  templateUrl: 'team-home.page.html',
})
export class TeamHomePage {
team: any;
teamDetailTab=TeamDetailsPage;
standingsTab= StandingsPage;

  constructor(public nav: NavController, public navParams: NavParams) {
    this.team=this.navParams.data;
  }

goHome(){
  //this.nav.push(MyTeamspage);
  this.nav.popToRoot()
}

}
