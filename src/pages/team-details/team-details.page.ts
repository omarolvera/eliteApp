import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, ToastController } from 'ionic-angular';
import { GamePage } from '../pages';

import * as _ from 'lodash';
import * as moment from 'moment';
import { FootballApiService } from '../../shared/shared';
import { TasksService } from '../../providers/tasks-service';



@Component({
  templateUrl: 'team-details.page.html',
})
export class TeamDetailsPage {
  allgames: any[];
  dateFilter: string;
  games: any[];
  private tourneyData: any;
  team: any = {};
  teamStanding: any = {};
  useDateFilter = false;
  isFollowing: any = false;

  constructor(
  
    private toast: ToastController,
    private alert: AlertController,
    private nav: NavController,
    private navParams: NavParams,
    private footballApi: FootballApiService,
  public tasksService: TasksService) {

  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tourneyData = this.footballApi.getCurrentTourneyData();
    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score)
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        };
      })
      .value();

    this.allgames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id });
    this.tasksService.isFavoriteTeam(this.team.id).then( (value) => {
      
      console.log("is favorite team:" + value);
      this.isFollowing = value;
    });

   

  }

  gameClicked($event, game) {
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.nav.parent.parent.push(GamePage, sourceGame);
  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allgames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allgames;
    }
  }

  getScoreWordL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : "";
  }

  getScoreDisplaybadgeClass(game) {
    return game.scoreDisplay.indexOf('W:') === 0 ? 'badge-primary' : 'badge-danger'
  }

  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this.alert.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.tasksService.unfavoriteTeam(this.team);
            //this.userSettings.unfavoriteTeam(this.team);

              let toast= this.toast.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position:'bottom'
              });
                toast.present();
            }
          },
          {
            text:'No'
          }
        ]
      });

      confirm.present();
    }else{
      this.isFollowing=true;
      this.tasksService.favoriteTeam(this.team, this.tourneyData.tournament.id, this.tourneyData.tournament.name);

      // this.userSettings.favoriteTeam(this.team, 
      //   this.tourneyData.tournament.id, 
      //   this.tourneyData.tournament.name);
    }


  }



  getScoreDisplay(isTeam1, team1Score, team2Score) {

    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }

  refreshAll(refresher){
    this.footballApi.refreshCurrentTourney().subscribe(()=>{
      refresher.complete();
      this.ionViewDidLoad();
    });
  }

}
