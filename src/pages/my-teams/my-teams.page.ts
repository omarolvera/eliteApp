import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TournamentsPage } from '../pages';



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
    constructor(private nav: NavController){
        
    }
    
    goToTournaments(){
        this.nav.push(TournamentsPage)
    }
}