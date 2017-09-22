import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import { FootballApiService } from '../../shared/shared';




/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-teams',
  templateUrl: 'teams.page.html',
})
export class TeamsPage {
teams=[];
  // teams =[
  //   { id:1, name:'HC Elite'},
  //   { id:2, name:'Team Takeover'},
  //   { id:3, name:'DC Thunder'}
  // ];

  constructor(public nav: NavController, public navParams: NavParams, private footballApi: FootballApiService) {

  }

  ionViewDidLoad(){
  let selectedTourney= this.navParams.data;
  this.footballApi.getTorunamentData(selectedTourney.id).subscribe((response)=>{
this.teams=response.teams;
  });
}

  itemTapped($event, team){

    this.nav.push(TeamHomePage, team);
  }
  
}
