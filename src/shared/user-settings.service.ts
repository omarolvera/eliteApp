// import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
// import { Events, Platform } from 'ionic-angular';
// import { SQLite, SQLiteObject, SQLiteTransaction } from '@ionic-native/sqlite';

// const DATABASE_FILE_NAME: string = 'football.db';
 
// @Injectable()
// export class UserSettingsService {
//      db: SQLiteObject = null;
//      database: SQLite= new SQLite();
//     constructor(
//         public storage: Storage,
//         private events: Events,
//         private sqlite: SQLite,
//         private platform:Platform,

//     ) {
//          this.createDatabaseFile();
         
//     }

//     setDatabase(db: SQLiteObject){
//         if(this.db === null){
//           this.db = db;
//         }
//       }

//     public createDatabaseFile() {

//         this.sqlite.create({
//             name: DATABASE_FILE_NAME,
//             location: 'default'
//         })
//             .then((db: SQLiteObject) => {
//                 console.log('Create db');
//                 this.setDatabase(db);
//                 this.createTables();

//             })
//             .catch(e => console.log(e));
//     }

//     private createTables(): void {
//         this.db.executeSql('CREATE TABLE IF NOT EXISTS `favoriteTeams` ( `id` TEXT, `team` TEXT )', {})
//             .then(() => console.log('Created favorite Teams table'))
//             .catch(e => console.log(e));
//     }


//     favoriteTeam(team, tournamentId, tournamentName) {
//         let item = { team: team, tournamentId: tournamentId, tournamenName: tournamentName }
//        this.storage.set(`${team.id}`, JSON.stringify(item));
//         this.db.executeSql('insert into `favoriteTeams` (id, team) values(?,?)',[team.id, JSON.stringify(item)])
//         .then(() => console.log('Created favorite Teams table'))
//         .catch(e => console.log(e));;
//         this.events.publish('favorites:changed');
//     }

//     unfavoriteTeam(team) {
//         this.storage.remove(`${team.id}`);
//         let sql = 'DELETE FROM favoriteTeams WHERE id=~`?`';
//          this.db.executeSql(sql, [team.id]).then((response)=>{
//                 console.log('item has been deleted');
//          }).catch(error => console.log(error));
//         this.events.publish('favorites:changed');
//     }

//     isFavoriteTeam(teamId) {
//         let sql = 'select * from `favoriteTeams` where id=`?`';
//         this.db.executeSql(sql,[teamId]).then((response)=>{
//             console.log('is favorite item response',response);
//         }).catch(error => console.log(error));
//         return this.storage.get(`${teamId}`).then(value => value ? true : false)
//     }

//     async getAllFavorites() {
//         let items = [];
//         // let allItems:any;
//         // await this.storage.forEach((v, k) => {
//         //     items.push(JSON.parse(v));
//         // });
         
//         //    return items.length ? items : [];
        
//           return  this.db.addTransaction((transaction)=>{
//                 transaction.executeSql('select * from favoriteTeams',{},
//                 (response)=>{
//                     console.log('response getting favorite teams:',response);
//                     for (let index = 0; index < response.rows.length; index++) {
//                         items.push(JSON.parse( response.rows.item(index)));
//                     }
//                     return Promise.resolve( items );

//                 },
//                 (error)=>{
//                     console.log('Error getting favorite teams:',error);
//                     Promise.reject(error)
//                 }
//             );
                
//             });
//     //   return   this.db.executeSql('select * from favoriteTeams',{})
//     //     .then((response)=>{
//     //      //   let tasks = [];
//     //         for (let index = 0; index < response.rows.length; index++) {
//     //             items.push(JSON.parse( response.rows.item(index)));
//     //         }
//     //         return Promise.resolve( items );

//     //     }).catch(error => Promise.reject(error));
        

     

    



//     }


// }