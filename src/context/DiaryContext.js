import createDataContext from './createDataContext';
import * as SQLite from 'expo-sqlite';
import { navigate } from '../navigationRef';
import { GET_ALL_DIARY_POSTS } from '../constants/Types';
import { AsyncStorage } from 'react-native';

const db = SQLite.openDatabase('db.db');

const diaryReducer = (state, action) => {
    switch (action.type) {
        case GET_ALL_DIARY_POSTS:
            return {diaryPosts: action.payload}
        default:
            return state;
    }
};

const getDiaryPosts = (dispatch) => {
    return async () => {
        const currentUser = await AsyncStorage.getItem('currentUser');
        try {
            await db.transaction(tx => {
                tx.executeSql(`SELECT * from "Diaries" WHERE "user_id" = "(SELECT 'id' from 'Users' WHERE 'username' = '${currentUser}')"`,
                [],
                (_, {rows: {_array}}) => {
                    // console.log(_array)
                    dispatch({type: GET_ALL_DIARY_POSTS, payload: _array});
                })
            })
        } catch (err) {
            
        }
    };
}

const addDiaryPost = () => {
    return async ({title, description}) => {
        const currentUser = await AsyncStorage.getItem('currentUser');
        try {
            // await db.transaction(tx => {
            //     tx.executeSql(`SELECT * from "Users" WHERE "username" = '${currentUser}'`,
            //     [],
            //     (_, {rows: {_array}}) => {
            //         console.log(_array);
            //     })
            // })
            await db.transaction(tx => {
                tx.executeSql(`INSERT INTO "Diaries" ("user_id", "time", "title", "description")
                    VALUES ("(SELECT 'id' from 'Users' WHERE 'username' = '${currentUser}')", '${new Date().getFullYear() + "." + new Date().getMonth() + "." + new Date().getDate()}', '${title}', '${description}')`)
            },
            err => console.log(err),
            () => {
                navigate('Index');
            })
        } catch (err) {
            
        }
    };
}

const deleteDiaryPost = (dispatch) => {
    return async ({id}) => {
        try {
            await db.transaction(tx => {
                tx.executeSql(`DELETE FROM "Diaries" WHERE "id" = '${id}'`)
            },
            err => console.log(err),
            success => console.log(success))
        } catch (err) {
            
        }
    };
};

export const {Context, Provider} = createDataContext(
    diaryReducer,
    {getDiaryPosts, addDiaryPost, deleteDiaryPost},
    {diaryPosts: null}
);