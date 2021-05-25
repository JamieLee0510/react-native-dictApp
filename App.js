/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Search from './src/screens/search';
import Profile from './src/screens/profile';

const Drawer = createDrawerNavigator();
const DrawerNav = (props) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Search"
        component={Search}
        options={{title: 'Search'}}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{title: 'My Profile'}}
      />
    </Drawer.Navigator>
  );
};

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="default" backgroundColor="#219bd9" />
      <DrawerNav />
    </NavigationContainer>
  );
};

export default App;
