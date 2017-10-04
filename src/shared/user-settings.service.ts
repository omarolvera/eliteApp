import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable()
export class UserSettingsService {
  

    constructor(
        public storage: Storage,
         private events:Events,
         private sqlite: SQLite
) {
    // this.sqlite.create({
    //     name: 'data.db',
    //     location: 'default'
    //   })
    //     .then((db: SQLiteObject) => {
      
      
    //       db.executeSql('CREATE TABLE IF NOT EXISTS  favoriteTeam(id VARCHAR(max), team VARCHAR(max))', {})
    //         .then(() => console.log('Executed SQL'))
    //         .catch(e => console.log(e));
      
      
    //     })
    //     .catch(e => console.log(e));
 }

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = { team: team, tournamentId: tournamentId, tournamenName: tournamentName }
        this.storage.set(`${team.id}`, JSON.stringify(item));
        this.events.publish('favorites:changed');
    }

    unfavoriteTeam(team) {
        this.storage.remove(`${team.id}`);
        this.events.publish('favorites:changed');
    }

    isFavoriteTeam(teamId) {
        return this.storage.get(`${teamId}`).then(value => value ? true : false)
    }

    async getAllFavorites() {
        let items = [];
        await this.storage.forEach((v, k) => {
            items.push(JSON.parse(v));
        });
        return items.length ? items : [];
        


    }

   
}