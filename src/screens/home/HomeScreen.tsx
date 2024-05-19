import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Dimensions, View} from 'react-native';

import auth from '@react-native-firebase/auth';

import Ionicons from 'react-native-vector-icons/Ionicons';

import LandingPage from './landing/LandingPage';
import SearchPage from './search/SearchPage';
import AddPost from './addpost/AddPostPage';
import ProfilePage from './profile/ProfilePage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get('window').width;

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    saveUid();
  }, []);

  const saveUid = async () => {
    const user = auth().currentUser;
    await AsyncStorage.setItem('UID', user ? user.uid : '');
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';

          if (route.name == 'Home' && !focused) {
            iconName = 'home-outline';
          } else if (route.name == 'Home' && focused) {
            iconName = 'home'
          } 
          else if (route.name == 'Search' && focused) {
            iconName = 'search';
          } else if (route.name == 'Search' && !focused) {
            iconName = 'search-outline';
          } else if (route.name == 'AddPost' && focused) {
            iconName = 'add-circle';
          } else if (route.name == 'AddPost' && !focused) {
            iconName = 'add-circle-outline';
          } else if (route.name == 'Profile' && focused) {
            iconName = 'person';
          } else {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#00ABF0',
        tabBarInactiveTintColor: '#CCC',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderRadius: 15,
          borderColor: '#00ABF0',
          borderWidth: 0.6,
          marginVertical: 10,
          marginHorizontal: WIDTH / 3.5,
          position: 'absolute',
          elevation: 10,
        },
      })}
      sceneContainerStyle={{
        backgroundColor: '#000000',
      }}>
      <Tab.Screen
        name="Home"
        component={LandingPage}
        options={{
          headerShown: false,
        }}
      />

      {/* <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          headerShown: false,
        }}
      /> */}

      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
