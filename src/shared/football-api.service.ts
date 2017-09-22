import { Injectable } from '@angular/core';
import {Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class FootballApiService{
    private baseUrl='https://footballapp-d6845.firebaseio.com'
currentTourney:any={};
    constructor(private http: Http){

    }

    getTournaments(){
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
            .subscribe((res) => resolve(res.json()));
                    });
        
    }

    getTorunamentData(tourneyId) : Observable<any>{
        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
        .map((response: Response) => {
            this.currentTourney=response.json();
            return this.currentTourney;
        })
    }

    getCurrentTourneyData(){
        return this.currentTourney;
    }
}

