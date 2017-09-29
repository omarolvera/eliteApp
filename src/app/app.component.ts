import { NgZone, Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamspage, TeamHomePage, TournamentsPage } from '../pages/pages';
import { UserSettingsService, FootballApiService } from '../shared/shared';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  favoriteTeams = [];
  rootPage: any = MyTeamspage;
  zone: any;


  constructor(
    private footballApi: FootballApiService,
    private loadingController: LoadingController,
    private userSettings: UserSettingsService,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private events: Events

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.refreshFavorites();

      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () =>
        setTimeout(() => { this.refreshFavorites() }, 1000)//Timeout to make sure localstorage save the data
      );
    });
  }


  goHome() {
    this.nav.push(MyTeamspage);
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  refreshFavorites() {//TODO:data is not changed 

    this.userSettings.getAllFavorites().then((data) => this.favoriteTeams = data);

  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.footballApi.getTournamentData(favorite.tournamentId).subscribe(x => this.nav.push(TeamHomePage));
  }
}
