import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';


import { createBottomTabNavigator,createStackNavigator,createAppContainer, createSwitchNavigator } from 'react-navigation';

import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import { colors, fonts, text } from "../../assets/components/styles";

/* Screen */
import Splash from '../HalamanLogin/Splash'
import Dashboard from '../HalamanDashboard/Dashboard';
import Inbox from '../HalamanInbox/Inbox';
import Profile from '../HalamanProfile/Profile';
import Request from '../HalamanPermintaan/Request';
import Login from '../HalamanLogin';
import Register from '../HalamanRegister';


import detailComponent from '../HalamanDashboard/detailComponent';
import detailInbox from '../HalamanInbox/detailInbox';
import itemInbox from '../HalamanInbox/itemInbox'

import ProfileShow from '../HalamanProfile/ProfileShow'
import UpdateProfile from '../HalamanProfile/UpdateProfile'
/* Screen */


import { YellowBox } from 'react-native';

const SplashNavigator = createStackNavigator (
  {
    Splash,
  },
  {
    headerMode: 'none',
  },
  {
    initialRouteName: 'Splash',
  },

);

const WelcomeNavigator = createStackNavigator(
  {
    Login,
    Register,
  
  },
  {
    headerMode:'none',
  },
  {
    initialRouteName: "Register",
  },
 
);

const HalamanUtamaNavigator = createStackNavigator(
  {
    Dashboard,
    detailComponent,
  },
  {
    headerMode:'none',
  }
  
)

const InboxNavigator = createStackNavigator(
  {
    Inbox,
    itemInbox,
  },
  
)

const ProfileNavigator = createStackNavigator(
  {
    Profile
  },
  {
    initialRouteName: "Profile",
  },

)


const ProfileShowNavigator = createStackNavigator(
  {
    ProfileShow,
    UpdateProfile,
  }
)

const BottomNavigator = createBottomTabNavigator(
    {

      Dashboard: 
      {
          screen: HalamanUtamaNavigator,
          navigationOptions: () => ({
            header: null,
            tabBarIcon: ({ tintColor, focused, horizontal }) => (
              <FontAwesome5
              name="first-aid"
              size={24}
              focused={focused}
              color={tintColor}
              />
            ),
            tabBarOptions: {
              activeTintColor: 'red',
              inactiveTintColor: 'gray',
              style:{
                backgroundColor:'white',
                borderTopWidth: 0,
                shadowOffset: { width: 5, height: 3 },
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 5
              },
              labelStyle: {
                fontSize: 12,
                fontFamily: 'poppins-bold'
              }
            },
          }),
          
         
    },
      Inbox: {
        screen: InboxNavigator,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <Icon
              name="inbox"
              color={tintColor}
              size={24}
            />
          ),
          tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
            style:{
              backgroundColor:'white',
              borderTopWidth: 0,
              shadowOffset: { width: 5, height: 3 },
              shadowColor: 'black',
              shadowOpacity: 0.5,
              elevation: 5
            },
            labelStyle: {
              fontSize: 12,
              fontFamily: 'poppins-bold'
            }
          },
        }),
      },
      Request: {
        screen: Request,
        navigationOptions: () => ({
          tabBarIcon: ({ tintColor }) => (
            <Icon
            name="paper-plane"
            color={tintColor}
            size={24}
            />
            ),
            tabBarOptions: {
              activeTintColor: 'red',
              inactiveTintColor: 'gray',
              style:{
                backgroundColor:'white',
                borderTopWidth: 0,
                shadowOffset: { width: 5, height: 3 },
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 5
              },
              labelStyle: {
                fontSize: 12,
                fontFamily: 'poppins-bold'
              }
            },
          }),
        },
        Profile: {
          screen: ProfileShowNavigator,
          navigationOptions: () => ({
            header: null,
            tabBarIcon: ({ tintColor }) => (
              <Icon
                name="users"
                color={tintColor}
                size={24}
              />
            ),
            tabBarOptions: {
              activeTintColor: 'red',
              inactiveTintColor: 'gray',
              style:{
                backgroundColor:'white',
                borderTopWidth: 0,
                shadowOffset: { width: 5, height: 3 },
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 5
              },
              labelStyle: {
                fontSize: 12,
                fontFamily: 'poppins-bold'
              }
            },
          }),
         
         
        },
       
      }
    
);

export default createAppContainer 
  (
  createSwitchNavigator
  (
    {
      WelcomeNavigator: WelcomeNavigator,
      BottomNavigator: BottomNavigator,
      SplashNavigator: SplashNavigator,

      ProfileNavigator : ProfileNavigator
    },
    {
      initialRouteName: "SplashNavigator"
    }
  )
  );

// export default createAppContainer(BottomNavigator);


const styles = StyleSheet.create({
 font: {
  fontFamily: 'poppins-bold',
 }
});
