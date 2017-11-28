import { Component, ViewChild } from '@angular/core';
import { MenuController, Events, Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamspage, TeamHomePage, TournamentsPage, EditTournamentPage } from '../pages/pages';
import { FootballApiService } from '../shared/shared';
import { TasksService } from '../providers/tasks-service';
import { SQLite } from '@ionic-native/sqlite';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  favoriteTeams: any[] = [];
  rootPage: any = MyTeamspage;
  zone: any;


  constructor(
    private menuController: MenuController,
    private footballApi: FootballApiService,
    private loadingController: LoadingController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private events: Events,
    public tasksService: TasksService,
    public sqlite: SQLite

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.createDataBase();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => {
        setTimeout(() => {
          this.refreshFavorites();
        }, 1000)//Timeout to make sure localstorage save the data
      }
      );
    });
  }

  private createDataBase() {
    this.sqlite.create({
      name: 'football.db',
      location: 'default'
    })
      .then((db) => {
        this.tasksService.setDatabase(db);
        return this.tasksService.createTable();
      })
      .then(() => {

        this.splashScreen.hide();


      })
      .catch(error => {
        console.log(error);
      });


  }



  ionViewDidEnter() {
    this.refreshFavorites();
  }



  goHome() {
    this.nav.push(MyTeamspage);
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  refreshFavorites() {//TODO:data is not changed 
    this.tasksService.openDb().then((data) => {

      this.tasksService.getAllFavorites(data).then((response) => {
        var items = [];
        if (response.rows.length > 0) {
          for (let index = 0; index < response.rows.length; index++) {
            items.push(JSON.parse(response.rows.item(index).team));
          }
        }
        this.favoriteTeams = items;
      });


    });

  }

  goToTeam($event, favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });

    loader.present();

    this.footballApi.getTournamentData(favorite.tournamentId)
      .subscribe(x => {
        this.menuController.close();
        this.nav.push(TeamHomePage, favorite.team);
      });

  }

  goNewTournament(){
    this.nav.push(EditTournamentPage);
  }

}
