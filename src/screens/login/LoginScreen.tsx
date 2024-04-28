import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {styles} from './Style';
import InputBox from '../../components/InputBox';
import CustomButton from '../../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get('window').width;

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const handleOnChangeEmail = (text: string) => {
    setEmail(text);
  };

  const handleOnChangePassword = (text: string) => {
    setPassword(text);
  };

  const handleLogin = () => {
    setLoginLoading(true);
    if (email.length == 0 && password.length == 0) {
      ToastAndroid.show('Your fields are empty!', ToastAndroid.LONG);
      setLoginLoading(false);
    } else if (email.length == 0 || password.length == 0) {
      ToastAndroid.show('Your fields are empty!', ToastAndroid.LONG);
      setLoginLoading(false);
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(async response => {
          await AsyncStorage.setItem('USER_LOGIN', 'True');
          navigation.replace('HomeScreen');
          setLoginLoading(false);
        })
        .catch((err: Error) => {
          ToastAndroid.show(err.message, ToastAndroid.LONG);
          setLoginLoading(false);
        });
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.baseContainer}>
        <View style={styles.logoBaseContainer}>
          <Image
            source={require('../../assets/Icons/MainLogo.png')}
            style={styles.logoImage}
          />
          <Text style={styles.loginText}>Login</Text>
        </View>
        <View style={styles.inputBaseContainer}>
          <InputBox
            height={40}
            value={email}
            onChangeText={handleOnChangeEmail}
            placeholder="Enter the email"
          />

          <InputBox
            height={40}
            value={password}
            onChangeText={handleOnChangePassword}
            placeholder="Enter the Password"
            secureInput={true}
          />

          <Text style={styles.dontHaveText}>
            Don't have account ?{' '}
            <Text
              style={{color: '#00ABF0', fontWeight: 'bold'}}
              onPress={() => navigation.navigate('SignupScreen')}>
              SignUp
            </Text>
          </Text>
        </View>
        <View style={styles.buttonBaseContainer}>
          <CustomButton
            text="Login"
            backgroundColor="#00ABF0"
            color="#FFF"
            laoding={loginLoading}
            onPress={handleLogin}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;
