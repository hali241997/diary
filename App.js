import React, { Component } from 'react';
import * as SQLite from 'expo-sqlite';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import AppNavigation from './src/navigation/AppNavigation';
import { setNavigator } from './src/navigationRef';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as DiaryProvider} from './src/context/DiaryContext';
import { AsyncStorage } from 'react-native';

const db = SQLite.openDatabase('db.db');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      dbLoaded: false
    }
  }

  componentDidMount() {
    this.loadFonts();
    this.loadDB();
    // this.dropDB();
  }

  async loadFonts() {
    await Font.loadAsync({
      'Horizon': require('./assets/fonts/Horizon.otf'),
      'Horizon-Italic': require('./assets/fonts/Horizon Italic.otf')
    });

    this.setState({fontLoaded: true});
  }

  async loadDB() {
    await db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS "Users" ("id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, "username"	TEXT NOT NULL UNIQUE, "password"	TEXT NOT NULL);'),
      tx.executeSql('CREATE TABLE IF NOT EXISTS "Diaries" ("id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, "user_id"	INTEGER NOT NULL, "time"	TEXT NOT NULL, "title"	TEXT NOT NULL, "description"	TEXT, FOREIGN KEY("user_id") REFERENCES "User"("id"));')
    },
    err => console.log(err),
    () => {
      this.setState({dbLoaded: true});
    });
  }

  async dropDB() {
    await db.transaction(tx => {
      tx.executeSql('DROP TABLE "Users"'),
      tx.executeSql('DROP TABLE "Diaries"')
    }, err => console.log(err), success => console.log(success));

    await AsyncStorage.removeItem('currentUser');
  }

  render() {
    return(
      <>
      {
        this.state.fontLoaded && this.state.dbLoaded ? (
          <DiaryProvider>
            <AuthProvider>
              <AppNavigation ref={(navigator) => setNavigator(navigator)} />
            </AuthProvider>
          </DiaryProvider>
        ) : (
          <AppLoading />
        )
      }
      </>
    );
  }
}

export default App;