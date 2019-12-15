import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainView from '../components/MainView';
import { Input } from 'react-native-elements';
import { auth } from '../constants/Styles';
import Spinner from '../components/Spinner';
import {Context as DiaryContext} from '../context/DiaryContext';

const CreateScreen = () => {
    const {state, addDiaryPost} = useContext(DiaryContext);
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [indicator, setIndicator] = useState(false);

    // console.log(state);

    return(
        <MainView>
            <Text style={{fontSize: 40, color: '#5386E4', alignSelf: 'center', marginBottom: 20}}>Create your post</Text>
            <Input
                placeholder="Title"
                placeholderTextColor='grey'
                containerStyle={{borderColor: 'black', borderWidth: 1, marginBottom: 20}}
                inputStyle={{paddingHorizontal: 0, fontWeight: 'bold'}}
                inputContainerStyle={{borderBottomWidth: 0}}
                value={title}
                onChangeText={(newText) => setTitle(newText)}
            />

            <Input
                placeholder="Description"
                placeholderTextColor='grey'
                containerStyle={{borderColor: 'black', borderWidth: 1, marginBottom: 20}}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={{flexWrap: 'wrap'}}
                value={des}
                onChangeText={(newText) => setDes(newText)}
            />

            {
                !indicator ? (
                    <TouchableOpacity
                        style={auth.buttonStyle}
                        onPress={() => {
                            setIndicator(true);
                            addDiaryPost({title, des});
                        }}
                    >
                        <Text style={auth.buttonTextStyle}>Add Post</Text>
                    </TouchableOpacity>
                ) : (
                    <Spinner />
                )
            }
        </MainView>
    );
};

export default CreateScreen;