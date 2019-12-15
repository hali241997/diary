import React, { useContext, useEffect } from 'react';
import {View, Text, FlatList, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import MainView from '../components/MainView';
import {Feather} from '@expo/vector-icons';
import {Context as DiaryContext} from '../context/DiaryContext';
import { auth } from '../constants/Styles';

const IndexScreen = ({navigation}) => {
    const {state, getDiaryPosts, deleteDiaryPost} = useContext(DiaryContext);

    useEffect(() => {
        getDiaryPosts();

        const listener = navigation.addListener('didFocus', () => {getDiaryPosts()});

        return () => {
            listener.remove();
        };
    }, []);

    console.log(state);

    return(
        <MainView>
            <Text style={{fontSize: 40, color: '#5386E4', alignSelf: 'center'}}>Hello</Text>
            <Text style={{fontSize: 20, alignSelf: 'center'}}>Here are your posts</Text>

            {
                state.diaryPosts === null || state.diaryPosts.length === 0 ? (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>You don't have any Posts</Text>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Create')}>
                            <Text style={{color: '#009900', fontWeight: 'bold'}}>Add Some Now</Text>
                        </TouchableWithoutFeedback>
                    </View>
                ) : (
                    <>
                        <FlatList
                            style={{flex: 1}}
                            data={state.diaryPosts}
                            scrollEnabled
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => {
                                // console.log(item);
                                return(
                                    <TouchableOpacity>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderColor: 'grey', borderTopWidth: 1, paddingHorizontal: 10, paddingVertical: 20}}>
                                            <Text>{item.title} - {item.time}</Text>
                                            <TouchableOpacity onPress={() => deleteDiaryPost(item.id)}>
                                                <Feather name='trash' size={24} color='black' />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                        <TouchableOpacity
                            style={{alignSelf: 'center', padding: 20, backgroundColor: '#009900', borderRadius: 10, marginBottom: 20}}
                            onPress={() => navigation.navigate('Create')}
                        >
                            <Text style={auth.buttonTextStyle}>Add New Post</Text>
                        </TouchableOpacity>
                    </>
                )
            }
        </MainView>
    );
};

export default IndexScreen;