import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const auth = createStackNavigator({
    Login: LoginScreen,
    SignUp: SignUpScreen
},
{
    initialRouteName: 'Login',
    defaultNavigationOptions: {
        header: null
    }
});

export default auth;