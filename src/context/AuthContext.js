import createDataContext from "./createDataContext";
import * as SQLite from 'expo-sqlite';
import { USER_SIGNUP_SUCCESS, USER_SIGNIN_SUCCESS, USER_SIGNOUT_SUCCESS } from "../constants/Types";
import { navigate } from "../navigationRef";
import { AsyncStorage } from "react-native";

const db = SQLite.openDatabase('db.db');

const authReducer = (state, action) => {
    switch(action.type) {
        case USER_SIGNUP_SUCCESS:
            return {...state, isSignedIn: true, currentUser: action.payload}
        case USER_SIGNIN_SUCCESS:
            return {...state, isSignedIn: true, currentUser: action.payload}
        case USER_SIGNOUT_SUCCESS:
            return {...state, isSignedIn: false, currentUser: null}
        default:
            return state;
    }
};

const signup = (dispatch) => {
    return async ({email, password}) => {
        try {
            await db.transaction(tx => {
                tx.executeSql(`INSERT INTO "Users" ("username", "password") VALUES ('${email}', '${password}');`)
            },
            err => console.log(err),
            async () => {
                await AsyncStorage.setItem('currentUser', email)
                dispatch({type: USER_SIGNUP_SUCCESS, payload: email});
                navigate('mainFlow');
                console.log('Signup successful');
            });
        } catch (err) {
            console.log(err);
        }
    };
};

const tryLocalSignin = (dispatch) => {
    return async () => {
        const currentUser = await AsyncStorage.getItem('currentUser');
        if(currentUser) {
            navigate('mainFlow');
        }
        else {
            navigate('authFlow');
        }
    };
}

const signin = (dispatch) => {
    return async ({email, password}) => {
        try {
            await db.transaction(tx => {
                tx.executeSql(`SELECT * from "Users" WHERE "username" = '${email}' AND "password" = '${password}'`)
            },
            err => console.log(err),
            async () => {
                await AsyncStorage.setItem('currentUser', email)
                console.log('Sign In Successful');
                dispatch({type: USER_SIGNIN_SUCCESS, payload: email});
                navigate('mainFlow');
            });
        } catch (err) {
            console.log(err);
        }
    };
};

const signout = (dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('currentUser');
        dispatch({type: USER_SIGNOUT_SUCCESS});
        navigate('authFlow');
    };
};

export const {Provider, Context} = createDataContext(
    authReducer,
    {signin, signout, signup, tryLocalSignin},
    {isSignedIn: false, currentUser: null}
);