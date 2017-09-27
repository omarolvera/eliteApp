import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TournamentsPage,TeamHomePage } from '../pages';
import { FootballApiService } from '../../shared/shared';




@Component({
    templateUrl: 'my-teams.page.html'
})
export class MyTeamspage{

    favorites=[
        {
        team:{"id": 6182,
        "name": "HC Elite 7th",
        "coach": "Steve Michelotti"},
        tournamentId:"89e13aa2-ba6d-4f55-9cc2-61eba6172c63",
        tournamentName: "March Madness Tournament"
    },
    {
        team:{"id": 805,
        "name": "HC Elite",
        "coach": "Steve Michelotti"},
        tournamentId: "98c6857e-b0d1-4295-b89e-2d95a45437f2",
        tournamentName: "Holiday Hoops Challenge"
    }
]
    constructor(private nav: NavController, private footballApi: FootballApiService, private loadingController:LoadingController){
        
    }
    
    goToTournaments(){
        this.nav.push(TournamentsPage)
    }
    
    favoriteTapped($event, favorite){
let loader = this.loadingController.create({
content: 'Getting data...',
dismissOnPageChange: true
});

loader.present();
this.footballApi.getTorunamentData(favorite.tournamentId)
.subscribe( t => this.nav.push(TeamHomePage, favorite.team))
    }
}