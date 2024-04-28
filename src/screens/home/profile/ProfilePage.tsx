import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

import {styles} from './Style';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = ({navigation} : {navigation: any}) => {
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('USER_LOGIN').then(() => {
            navigation.replace("LoginScreen")
        });
      });
  };

  return (
    <ScrollView>
      <View style={styles.baseContainer}>
        <View style={styles.profilePicBaseContainer}>
          <View style={styles.profilePicContainer}>
            <Ionicons name="person" color={'#888'} size={40} />
          </View>
          <Text style={styles.usernameTitle}>Official_jitcode</Text>
        </View>
        <View style={styles.profileDetailBaseContainer}>
          <View style={styles.postCountContainer}>
            <Text style={styles.detailTitle}>FOLLOW</Text>
            <Text style={styles.detailCount}>0</Text>
          </View>
          <View style={styles.postCountContainer}>
            <Text style={styles.detailTitle}>POSTS</Text>
            <Text style={styles.detailCount}>0</Text>
          </View>
          <View style={styles.postCountContainer}>
            <Text style={styles.detailTitle}>FOLLOWER</Text>
            <Text style={styles.detailCount}>0</Text>
          </View>
        </View>
        <View style={styles.editButtonContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleSignOut}>
            <Text style={styles.editText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
