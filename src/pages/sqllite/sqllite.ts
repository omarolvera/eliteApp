import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
const DATABASE_FILE_NAME: string = 'football.db';

@Component({
  selector: 'page-sqllite',
  templateUrl: 'sqllite.html',
})
export class SqllitePage {
  private db: SQLiteObject;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private sqlite: SQLite
  ) {
    this.createDatabaseFile();
  }

  private createDatabaseFile() {
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('Create db');
        this.db = db;
        this.createTables();

      })
      .catch(e => console.log(e));
  }

  private createTables(): void {
    this.db.executeSql('CREATE TABLE IF NOT EXISTs `favoriteTeams` ( `id` TEXT, `team` TEXT )', {})
      .then(() => console.log('Created favorite Teams table'))
      .catch(e => console.log(e));
  }

  ionViewDidLoad() {

  }

}
