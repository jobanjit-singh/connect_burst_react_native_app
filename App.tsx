import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {} from 'react-native';
import SplashScreen from './src/screens/splash/SplashScreen';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SplashScreen'
      >
        <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
