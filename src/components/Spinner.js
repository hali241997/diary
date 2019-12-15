import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Spinner = () => {
    return(
        <View style={{alignSelf: 'flex-end', padding: 20, borderColor: '#009900', borderRadius: 10, borderWidth: 1, marginBottom: 20}}>
            <ActivityIndicator size="large" color='#009900' />
        </View>
    );
};

export default Spinner;