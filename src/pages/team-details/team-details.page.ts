import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


@Component({
  templateUrl: 'team-details.page.html',
})
export class TeamDetailsPage {
team:any;
  constructor(public nav: NavController, public navParams: NavParams) {
    this.team= this.navParams.data;
    console.log('nav params',this.navParams);
  }



}
