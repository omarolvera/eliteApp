import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { MyTeamspage , TeamsPage} from '../pages';



@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.page.html',
})
export class TournamentsPage {

  constructor(public nav: NavController, public navParams: NavParams) {
  }

 itemTapped(){
   this.nav.push(TeamsPage);
 }

}
