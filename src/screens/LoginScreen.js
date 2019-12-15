import React, { useState, useContext } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import AuthView from '../components/AuthView';
import { auth } from '../constants/Styles';
import { Input } from 'react-native-elements';
import {Entypo} from '@expo/vector-icons';
import Spinner from '../components/Spinner';
import {Context as AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
    const {state, signin} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [STE, setSTE] = useState(true);
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
                secureTextEntry={STE}
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
                            setSTE(!STE);
                        }
                    }}>
                        <Entypo name={password !== '' ? (STE ? 'eye-with-line': 'eye'): 'eye-with-line'} size={20} color='grey' />
                    </TouchableWithoutFeedback>
                }
            />

            {
                !indicator ? (
                    <TouchableOpacity
                        style={auth.buttonStyle}
                        onPress={() => {
                            setIndicator(true);
                            signin({email, password});
                        }}
                    >
                        <Text style={auth.buttonTextStyle}>LOGIN</Text>
                    </TouchableOpacity>
                ) : (
                    <Spinner />
                )
            }

            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <Text>Don't have an acount? </Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{color: '#009900', fontWeight: 'bold'}}>Sign Up here</Text>
                </TouchableWithoutFeedback>
            </View>
        </AuthView>
    );
};

export default LoginScreen