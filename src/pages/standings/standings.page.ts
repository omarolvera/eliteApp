import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FootballApiService } from '../../shared/shared';
import * as _ from 'lodash';

@Component({

  templateUrl: 'standings.page.html',
})
export class StandingsPage {
  standings: any[];
  team: any;
  allStandings: any[];
  divisionFilter='division';
  constructor(public nav: NavController, public navParams: NavParams, private footballApi: FootballApiService) {
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tourneyData = this.footballApi.getCurrentTourneyData();
    this.standings = tourneyData.standings;

    // this.allStandings =
    //   _.chain(this.standings)
    //     .groupBy('division')
    //     .toPairs()
    //     .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //     .value();

    this.allStandings = tourneyData.standings;
    this.filterDivision();
  }

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.division !== records[recordIndex-1].division) {
    return record.division;
    }
    return null;
  }

  filterDivision(){
    if (this.divisionFilter === 'all'){
this.standings= this.allStandings;
    }else{
this.standings= _.filter(this.allStandings, s => s.division === this.team.division);
    }

  }

}
