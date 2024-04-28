import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {} from 'react-native';
import SplashScreen from './src/screens/splash/SplashScreen';
import LoginScreen from './src/screens/login/LoginScreen';
import SignupScreen from './src/screens/signup/SignupScreen';
import HomeScreen from './src/screens/home/HomeScreen';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SplashScreen'
      >
        <Stack.Screen 
          name={'SplashScreen'} 
          component={SplashScreen}
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#000'
            }
          }}
        />
        <Stack.Screen 
          name='LoginScreen'
          component={LoginScreen}
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#000'
            }
          }}
        />
        <Stack.Screen 
          name='SignupScreen'
          component={SignupScreen}
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#000'
            }
          }}
        />
        <Stack.Screen 
          name='HomeScreen'
          component={HomeScreen}
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: '#000'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
