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

import {styles} from './Style';
import InputBox from '../../components/InputBox';
import CustomButton from '../../components/CustomButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get('window').width;

const SignupScreen = ({navigation}: {navigation: any}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  const handleOnChangeEmail = (text: string) => {
    setEmail(text);
  };

  const handleOnChangePassword = (text: string) => {
    setPassword(text);
  };

  const handleOnChangeUsername = (text: string) => {
    setUsername(text);
  };

  const handleSignup = async () => {
    if (email.length == 0 && password.length == 0 && username.length == 0) {
      ToastAndroid.show('Your fields are empty!', ToastAndroid.LONG);
    } else if (
      email.length == 0 ||
      password.length == 0 ||
      username.length == 0
    ) {
      ToastAndroid.show('Your fields are empty!', ToastAndroid.LONG);
    } else {
      setSignupLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async response => {
          setSignupLoading(false)
          console.log(response.user);
          await AsyncStorage.setItem("USER_ID",response.user.uid)
          firestore().collection('USER').doc(response.user.uid).set({
            username: username,
            follower: '0',
            following: '0',
            posts: '0',
            postsList: []
          }).then(response => {
            navigation.pop();
            setSignupLoading(false)
          }).catch(err => {
            ToastAndroid.show('Error in creating user!', ToastAndroid.LONG);
            setSignupLoading(false)
          })
        })
        .catch((err: Error) => {
          ToastAndroid.show(err.message, ToastAndroid.LONG);
          setSignupLoading(false)
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
          <Text style={styles.loginText}>Sign Up</Text>
        </View>
        <View style={styles.inputBaseContainer}>
          <InputBox
            height={40}
            value={username}
            onChangeText={handleOnChangeUsername}
            placeholder="Enter the username"
          />

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
            Already have account ?{' '}
            <Text
              style={{color: '#00ABF0', fontWeight: 'bold'}}
              onPress={() => navigation.pop()}>
              Login
            </Text>
          </Text>
        </View>
        <View style={styles.buttonBaseContainer}>
          <CustomButton
            text="SignUp"
            backgroundColor="#00ABF0"
            color="#FFF"
            laoding={signupLoading}
            onPress={handleSignup}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default SignupScreen;
