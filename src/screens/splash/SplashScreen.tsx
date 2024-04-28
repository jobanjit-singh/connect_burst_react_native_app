import React, {useEffect, useRef} from 'react';
import {Animated, Image, View} from 'react-native';

import {styles} from './Style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}: {navigation: any}) => {
  const imageAnimation = useRef(new Animated.Value(0)).current;

  const moveToLogin = async () => {
    await AsyncStorage.getItem('USER_LOGIN').then(response => {
      setTimeout(() => {
        navigation.replace(response ? 'HomeScreen' : 'LoginScreen');
      }, 3000);
    });
  };

  useEffect(() => {
    imageAnimationAnim();
    moveToLogin();
  }, []);

  const imageAnimationAnim = () => {
    Animated.spring(imageAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.baseContainer}>
      <Animated.Image
        source={require('../../assets/Icons/MainLogo.png')}
        style={[
          styles.logoImage,
          {
            transform: [
              {
                scale: imageAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
            opacity: imageAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      />
    </View>
  );
};

export default SplashScreen;
