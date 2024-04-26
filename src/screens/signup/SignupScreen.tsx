import React, {useState} from 'react';
import {Dimensions, Image, Text, View} from 'react-native';

import {styles} from './Style';
import InputBox from '../../components/InputBox';
import CustomButton from '../../components/CustomButton';

const WIDTH = Dimensions.get('window').width;

const SignupScreen = ({navigation} : {navigation:any}) => {
    const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnChangeEmail = (text: string) => {
    setEmail(text);
  };

  const handleOnChangePassword = (text: string) => {
    setPassword(text);
  };

  const handleOnChangeUsername = (text:string) => {
    setUsername(text)
  }

  return (
    <View style={styles.baseContainer}>
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
            placeholder='Enter the username'
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
        />

        <Text style={styles.dontHaveText} >
          Already have account ? <Text 
          style={{color: '#00ABF0', fontWeight: 'bold'}} 
            onPress={()=>navigation.pop()}
          >Login</Text>
        </Text>

      </View>
      <View style={styles.buttonBaseContainer}>
        <CustomButton 
          text='SignUp'
          backgroundColor='#00ABF0'
          color='#FFF'
        />
      </View>
    </View>
  );
};

export default SignupScreen;
