import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {styles} from './Style';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { request, PERMISSIONS, openSettings } from 'react-native-permissions';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfilePage = ({navigation}: {navigation: any}) => {
  const [isLoading, setLoading] = useState(true);
  const [uid, setUid] = useState('');
  const [profileData, setProfileData] = useState({
    postList: [],
    follower: '',
    following: '',
    posts: '',
    username: ''
  });
  const [editProfileButton, setEditProfileButton] = useState(true);

  useEffect(() => {
    getUid();
  }, []);

  useEffect(() => {
    getProfile();
  }, [uid]);

  const getUid = async () => {
    const uid = await AsyncStorage.getItem('UID');
    setUid(uid ? uid : '');
  }

  const getProfile = async () => {
    await firestore()
      .collection('USER')
      .doc(uid)
      .get()
      .then(data => {
        if(data.exists) {
          setProfileData({
            follower: data.data()?.follower,
            following: data.data()?.following,
            posts: data.data()?.posts,
            username: data.data()?.username,
            postList: data.data()?.postsList
          })
          setLoading(false)
        }
      })
  };

  const handleSignOut = () => {
    auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem('USER_LOGIN').then(() => {
          navigation.replace('LoginScreen');
        });
      });
  };

  const handleUpdateProfile = async () => {
    await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(result => {
      if(result == 'granted') {
        launchImageLibrary({
          mediaType: 'photo'
        }).then(imageResponse => {
          console.log(`----------------IMAGE RESPONSE ${imageResponse}`)
        })
      } else {
        openSettings();
      }
    })
  }

  return (
    <ScrollView>
      <View style={styles.baseContainer}>
        <View style={styles.profilePicBaseContainer}>
          <TouchableOpacity 
            style={styles.profilePicContainer}
            activeOpacity={0.6}
            onPress={handleUpdateProfile}
          >
            <Ionicons name="person" color={'#888'} size={40} />
          </TouchableOpacity>
          {isLoading ? (
            <ActivityIndicator color={'#FFF'} size={20} />
          ) : (
            <Text style={styles.usernameTitle}>{profileData.username}</Text>
          )}
        </View>
        <View style={styles.profileDetailBaseContainer}>
          <View style={styles.postCountContainer}>
            <Text style={styles.detailTitle}>Follow</Text>
            {isLoading ? (
              <ActivityIndicator color={'#FFF'} size={15} />
            ) : (
              <Text style={styles.detailCount}>{profileData.follower}</Text>
            )}
          </View>
          <View style={styles.postCountContainer}>
            <Text style={styles.detailTitle}>Posts</Text>
            {isLoading ? (
              <ActivityIndicator color={'#FFF'} size={15} />
            ) : (
              <Text style={styles.detailCount}>{profileData.posts}</Text>
            )}
          </View>
          <View style={styles.postCountContainer}>
            <Text style={styles.detailTitle}>Following</Text>
            {isLoading ? (
              <ActivityIndicator color={'#FFF'} size={15} />
            ) : (
              <Text style={styles.detailCount}>{profileData.following}</Text>
            )}
          </View>
        </View>
        <View style={styles.editButtonContainer}>
          <TouchableOpacity 
            style={[styles.editButton]}
            disabled={editProfileButton}
          >
            <Text style={[styles.editText]}>Edit Profile</Text>
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
