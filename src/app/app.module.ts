import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { MyApp } from './app.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamspage, TeamDetailsPage, TournamentsPage, GamePage, TeamsPage, StandingsPage, TeamHomePage, MapPage, EditTournamentPage } from '../pages/pages';
import { FootballApiService } from '../shared/shared';
import { IonicStorageModule } from '@ionic/storage';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { SQLite } from '@ionic-native/sqlite';
import { TasksService } from  '../providers/tasks-service';


@NgModule({
  declarations: [
    MyApp,
    MyTeamspage,
    TournamentsPage,
    TeamDetailsPage,
    GamePage,
    TeamsPage,
    StandingsPage,
    TeamHomePage,
    MapPage,
    EditTournamentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWDUOxgOcuaw8MWzuSSzE4AjJp1KIy5K8'
    }),
    AgmSnazzyInfoWindowModule,
    FormsModule                              
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamspage,
    TournamentsPage,
    TeamDetailsPage,
    GamePage,
    TeamsPage,
    StandingsPage,
    TeamHomePage,
    MapPage,
    EditTournamentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FootballApiService,
        SQLite,
        TasksService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
   
  ]
})
export class AppModule {

  constructor(
   // public userSettingsService: UserSettingsService,

  ) {
  //  this.userSettingsService.createDatabaseFile();
  }
}
