import React from 'react';
import {TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView} from 'react-native';
import { SafeAreaView } from 'react-navigation';

const AuthView = ({children}) => {
    return(
        <SafeAreaView forceInset={{top: 'always'}} style={{flex: 1, backgroundColor: '#D4E6F1'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
                    {children}
                    <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80} />
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default AuthView;