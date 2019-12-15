import React, { useState, useContext } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import {auth} from '../constants/Styles';
import AuthView from '../components/AuthView';
import { Input } from 'react-native-elements';
import {Entypo} from '@expo/vector-icons';
import Spinner from '../components/Spinner';
import {Context as AuthContext} from '../context/AuthContext';

const SignUpScreen = ({navigation}) => {
    const {state, signup} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('');
    const [STE1, setSTE1] = useState(true);
    const [STE2, setSTE2] = useState(true);
    const [indicator, setIndicator] = useState(false);

    console.log(state);

    return(
        <AuthView>
            <Text style={auth.appHeadingTextStyle}>Diary</Text>
            
            <Input
                placeholder="Email"
                placeholderTextColor='grey'
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='email-address'
                containerStyle={{marginBottom: 20}}
                value={email}
                onChangeText={(newText) => setEmail(newText)}
            />

            <Input
                secureTextEntry={STE1}
                placeholder="Password"
                placeholderTextColor='grey'
                autoCapitalize='none'
                autoCorrect={false}
                containerStyle={{marginBottom: 20}}
                value={password}
                onChangeText={(newText) => setPassword(newText)}
                rightIcon={
                    <TouchableWithoutFeedback onPress={() => {
                        if(password !== '') {
                            setSTE1(!STE1);
                        }
                    }}>
                        <Entypo name={password !== '' ? (STE1 ? 'eye-with-line': 'eye'): 'eye-with-line'} size={20} color='grey' />
                    </TouchableWithoutFeedback>
                }
            />

            <Input
                secureTextEntry={STE2}
                placeholder="Confirm Password"
                placeholderTextColor='grey'
                autoCapitalize='none'
                autoCorrect={false}
                containerStyle={{marginBottom: 20}}
                value={confPassword}
                onChangeText={(newText) => setConfPassword(newText)}
                rightIcon={
                    <TouchableWithoutFeedback onPress={() => {
                        if(confPassword !== '') {
                            setSTE2(!STE2);
                        }
                    }}>
                        <Entypo name={confPassword !== '' ? (STE2 ? 'eye-with-line': 'eye'): 'eye-with-line'} size={20} color='grey' />
                    </TouchableWithoutFeedback>
                }
            />

            {
                !indicator ? (
                    <TouchableOpacity
                        style={auth.buttonStyle}
                        onPress={() => {
                            setIndicator(true);
                            signup({email, password});
                        }}
                    >
                        <Text style={auth.buttonTextStyle}>Sign Up</Text>
                    </TouchableOpacity>
                ) : (
                    <Spinner />
                )
            }

            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text>Already have an acount? </Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                    <Text style={{color: '#009900', fontWeight: 'bold'}}>Login here</Text>
                </TouchableWithoutFeedback>
            </View>
        </AuthView>
    );
};

export default SignUpScreen;