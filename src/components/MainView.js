import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView, View } from 'react-native';

const MainView = ({children}) => {
    return(
        <SafeAreaView forceInset={{top:'always'}} style={{flex: 1, backgroundColor: '#D4E6F1'}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1}}>
                    {children}
                    <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80} />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

export default MainView;