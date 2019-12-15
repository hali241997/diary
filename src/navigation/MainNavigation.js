import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from '../screens/IndexScreen';
import ShowScreen from '../screens/ShowScreen';
import CreateScreen from '../screens/CreateScreen';
import EditScreen from '../screens/EditScreen';

const main = createStackNavigator({
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen
},
{
    initialRouteName: 'Index',
    defaultNavigationOptions: {
        header: null
    }
});

export default main;