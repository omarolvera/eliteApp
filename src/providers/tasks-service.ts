
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { SQLite } from '@ionic-native/sqlite';
 import { Events, Platform } from 'ionic-angular';

@Injectable()
export class TasksService {
 
  // public properties

  db: SQLiteObject = null;

  constructor(  private events: Events,
     public sqlite: SQLite ) {
    this.openDb();
  }

  // public methods
  public openDb(){
    return this.sqlite.create({
      name: 'football.db',
      location: 'default' // el campo location es obligatorio
    })
    .then((db: SQLiteObject) => {
      return db
      
   });
}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS `favoriteTeams` ( `id` TEXT, `team` TEXT )';
    return this.db.executeSql(sql, []);
  }

  
  favoriteTeam(team, tournamentId, tournamentName) {
    let item = { team: team, tournamentId: tournamentId, tournamenName: tournamentName }
    
    this.db.executeSql('insert into `favoriteTeams` (id, team) values(?,?)',[team.id, JSON.stringify(item)])
    .then(() => console.log('Created favorite Teams table'))
    .catch(e => console.log(e));;
    this.events.publish('favorites:changed');
}

  isFavoriteTeam(teamId) {
    let sql = 'select * from `favoriteTeams` where id=?';
   return this.db.executeSql(sql,[teamId]).then((response)=>{
        let isFavorite= false;
        isFavorite= response.rows.length > 0;
        return Promise.resolve(isFavorite);
    }).catch(error => console.log(error));
    
}

unfavoriteTeam(team) {
  
  let sql = 'DELETE FROM `favoriteTeams` WHERE id=?';
  console.log('teamid:' + team.id);
   this.db.executeSql(sql, [team.id]).then((response)=>{
          console.log('item has been deleted');
   }).catch(error => console.log(error));
   this.events.publish('favorites:changed');
}

 getAllFavorites(db) {
  return db.executeSql('select * from favoriteTeams',[]);
};

//console.log("database:" +this.db);

    // return  this.db.executeSql('select * from favoriteTeams',[]).then((response) => {
    //  var items = [];
    //  if(response.rows.length >0){
    //   for (let index = 0; index < response.rows.length; index++) {
    //     var data= JSON.parse(response.rows.item(index).team);
        
    //      items.push({
    //        "teamName": data.team.name,
    //        "tournamenName": data.tournamenName,
    //        "tournamentId": data.tournamentId
    //       });
        
    //   }}
     
    //   return Promise.resolve(items );
    // }) .catch(error => 
    //   Promise.reject(error)
    // );

  //}
  
    



  update(task: any){
    let sql = 'UPDATE tasks SET title=?, completed=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.completed, task.id]);
  }

}