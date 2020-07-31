import React from 'react';

import {
    createSwitchNavigator
} from 'react-navigation';
import {
    createStackNavigator
} from 'react-navigation-stack';
import {
    createBottomTabNavigator
} from 'react-navigation-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Theme from '../theme';

import Splash from '../containers/splash';
import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';

import Home from '../containers/home';
import Users from '../containers/manageUsers';

const hideHeader = {
    defaultNavigationOptions: {
        headerShown: false
    },
};
const WelcomeStack = createStackNavigator({
    Splash: {
        screen: Splash
    },
    Login: {
        screen: Login

    },
    Register: {
        screen: Register
    }
}, hideHeader);
const HomeStack = createStackNavigator({
    Home:{
        screen: Home
    }
}, hideHeader);
const ManageUsersStack = createStackNavigator({ 
    ManageUsers:{
        screen: Users
    }
})
const BottomNav = createStackNavigator({
    BottomNav: createBottomTabNavigator(
        {
            Home: {
                screen: HomeStack,
                navigationOptions: {
                    tabBarLabel: 'Home',
                },
            },
            ManageUsers:{
                screen: ManageUsersStack,
                navigationOptions: {
                    tabBarLabel: 'Manage Users',
                }
            }
        }, {
        defaultNavigationOptions: ({
            navigation
        }) => ({
            tabBarIcon: ({
                focused,
                horizontal,
                tintColor
            }) => {
                const {
                    routeName
                } = navigation.state;

                let iconName;
                if (routeName === 'Home') {
                    iconName = 'home';
                } else if (routeName === 'ManageUsers') {
                    iconName = 'users';
                }
                return <FontAwesome5 name={iconName} size={18} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: Theme.colors.SBut_COLOR,
            inactiveTintColor: Theme.colors.IN_ACTIVE_TINT_COLOR,
            style: {
                borderTopWidth: 0,
            },
            showLabel: false


        },
    })
},
    hideHeader)
const SwitchNav = createSwitchNavigator({
    Welcome: WelcomeStack,
    Mains: BottomNav
});

export default SwitchNav;