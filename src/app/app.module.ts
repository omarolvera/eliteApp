import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule  } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamspage, TeamDetailsPage, TournamentsPage, GamePage, TeamsPage, StandingsPage, TeamHomePage, MapPage } from '../pages/pages';
import { FootballApiService, UserSettingsService } from '../shared/shared';
import {  IonicStorageModule } from '@ionic/storage';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { SQLite } from '@ionic-native/sqlite';


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
    MapPage
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
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FootballApiService,
    UserSettingsService,
    SQLite
  ]
})
export class AppModule {}
