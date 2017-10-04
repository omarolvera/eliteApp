import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FootballApiService } from '../../shared/shared';
import { AgmCoreModule, MarkerManager } from '@agm/core';
declare var window: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.page.html',
})
export class MapPage {
  map: any = {};
  constructor(
    private footbalLApi: FootballApiService,
    public navParams: NavParams

  ) {
  }

  ionViewDidLoad() {
    let games = this.navParams.data;
    let tourneyData = this.footbalLApi.getCurrentTourneyData();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location,
      isOpen: false
    };

  }

  markerClick() {
    this.map.isOpen = Object.assign({}, this.map.isOpen)
  }

  getDirections(){
    window.location = `geo:${this.map.lat},${this.map.lng};u=35;`
  }


}
