import React, {useState} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';

import {styles} from './Style';
import InputBox from '../../components/InputBox';
import CustomButton from '../../components/CustomButton';

const WIDTH = Dimensions.get('window').width;

const LoginScreen = ({navigation} : {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeEmail = (text: string) => {
    setEmail(text);
  };

  const handleOnChangePassword = (text: string) => {
    setPassword(text);
  };

  return (
    <View style={styles.baseContainer}>
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
        />

        <Text style={styles.dontHaveText}>
          Don't have account ?{' '}
          <Text 
            style={{color: '#00ABF0', fontWeight: 'bold'}}
            onPress={() => navigation.navigate("SignupScreen")}>SignUp</Text>
        </Text>
      </View>
      <View style={styles.buttonBaseContainer}>
        <CustomButton text="Login" backgroundColor="#00ABF0" color="#FFF" />
      </View>
    </View>
  );
};

export default LoginScreen;
