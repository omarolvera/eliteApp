import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class FootballApiService {
    private baseUrl = 'https://footballapp-d6845.firebaseio.com'
    currentTourney: any = {};
    private tourneyData: any = {};

    constructor(private http: Http) {

    }

    getTournaments() {
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe((res) => resolve(res.json()));
        });

    }


    getTournamentData(tourneyId, forceRefresh: boolean = false): Observable<any> {
        if (!forceRefresh && this.tourneyData[tourneyId]) {
            this.currentTourney = this.tourneyData[tourneyId];
            return Observable.of(this.currentTourney);
        }


        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map((response: Response) => {
                this.tourneyData[tourneyId] = response.json();
                this.currentTourney = this.tourneyData[tourneyId];
                return this.currentTourney;
            })

    }

    getCurrentTourneyData() {
        return this.currentTourney;
    }

    refreshCurrentTourney() {
        return this.getTournamentData(this.currentTourney.tournament.id, true);
    }
}

