import { createSwitchNavigator, createAppContainer } from "react-navigation";
import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
import ResolveAuthScreen from '../screens/ResolveAuthScreen';

const navigator = createSwitchNavigator({
    ResolveAuth: ResolveAuthScreen,
    authFlow: AuthNavigation,
    mainFlow: MainNavigation
},
{
    initialRouteName: 'ResolveAuth'
});

export default createAppContainer(navigator);