import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {styles} from './Style';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request, PERMISSIONS, openSettings} from 'react-native-permissions';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');

const ProfilePage = ({navigation}: {navigation: any}) => {
  const [isLoading, setLoading] = useState(true);
  const [uid, setUid] = useState('');
  const [profileData, setProfileData] = useState({
    postList: [],
    follower: '',
    following: '',
    posts: '',
    username: '',
    profileImage: '',
  });
  const [editProfileButton, setEditProfileButton] = useState(true);
  const [imageUrl, setImageUrl] = useState<ImagePickerResponse>();
  const [editProfileText, setEditProfileText] = useState('');
  const [postData, setPostData] = useState([]);
  const [postDataLoading, setPostDataLoading] = useState(true);
  const [postUpdate, setPostUpdate] = useState(0);

  useEffect(() => {
    getUid();
  }, []);

  useEffect(() => {
    getProfile();
  }, [uid]);

  const getUid = async () => {
    const uid = await AsyncStorage.getItem('UID');
    setUid(uid ? uid : '');
  };

  const getProfile = () => {
    firestore()
      .collection('USER')
      .doc(uid)
      .onSnapshot(data => {
        if (data.exists) {
          setProfileData({
            follower: data.data()?.follower,
            following: data.data()?.following,
            posts: data.data()?.posts,
            username: data.data()?.username,
            postList: data.data()?.postsList,
            profileImage: data.data()?.profileImage
              ? data.data()?.profileImage
              : '',
          });
          setLoading(false);
          getPostData();
        }
      });
  };

  const getPostData = async () => {
    firestore()
      .collection('POST')
      .where('uid', '==', uid)
      .onSnapshot(async data => {
        const dataPost: any = [];
        data.forEach(post => {
          dataPost.push(post.data());
          console.log(`-------------EACH POST ${post.data()}`);
        });
        setPostData(dataPost);
        setPostDataLoading(false);
      });
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
    const status = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    const status1 = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)

    console.log(`-------------------REQUEST READ MEDIA IAMGES ${status}`);
    console.log(`-------------------REQUEST READ EXTERNAL MEDIA ${status1}`);

    if (status == 'granted' || status1 == 'granted') {
      launchImageLibrary({
        mediaType: 'photo',
      }).then(imageResponse => {
        if (imageResponse.didCancel) {
          setImageUrl(undefined);
          setEditProfileButton(true);
        } else {
          setEditProfileButton(false);
          setImageUrl(imageResponse);
        }
      });
    } else {
      openSettings();
    }
  };

  const uplodaProfileImage = async () => {
    setEditProfileText('Wait...');
    const reference = storage().ref(imageUrl?.assets[0].fileName);
    await reference.putFile(imageUrl?.assets[0].uri).then(response => {
      console.log(
        `-------------------------UPLOAD IMAGE INSTORAGE ${response}`,
      );
    });
    const linkOfImage = await reference.getDownloadURL();
    await firestore()
      .collection('USER')
      .doc(uid)
      .update({
        profileImage: linkOfImage,
      })
      .then(response => {
        setEditProfileText('');
        setEditProfileButton(true);
      });
  };

  return (
    <ScrollView>
      <View style={styles.baseContainer}>
        <View style={styles.profilePicBaseContainer}>
          <TouchableOpacity
            style={styles.profilePicContainer}
            activeOpacity={0.6}
            onPress={handleUpdateProfile}>
            {profileData.profileImage || imageUrl ? (
              <Image
                source={{
                  uri: imageUrl
                    ? imageUrl.assets[0].uri
                    : profileData.profileImage,
                }}
                style={{width: 80, height: 80}}
              />
            ) : (
              <Ionicons name="person" color={'#888'} size={40} />
            )}
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
              <Text style={styles.detailCount}>{postData.length}</Text>
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
            onPress={uplodaProfileImage}>
            <Text style={[styles.editText]}>
              {editProfileText ? editProfileText : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={handleSignOut}>
            <Text style={styles.editText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postListBaseContainer}>
        {postDataLoading ? (
          <View>
            <ActivityIndicator color={'#FFF'} size={20} />
          </View>
        ) : postData.length == 0 ? (
          <View style={styles.noPostContainer}>
            <Image
              source={require('../../../assets/Icons/NoFound.png')}
              style={{
                width: width / 2,
                height: height / 5,
              }}
            />
            <Text style={styles.noPostText}>No Post yet</Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={postData}
            renderItem={({item, index}) => {
              return (
                <View
                  style={[
                    styles.itemBaseContainer,
                    {marginBottom: index == postData.length - 1 ? 80 : 10},
                  ]}>
                  {item.profileImage != '' && (
                    <Image
                      source={{uri: item.profileImage}}
                      width={width / 1.18}
                      height={height / 2}
                      style={{
                        borderRadius: 10,
                        marginBottom: 10,
                      }}
                    />
                  )}
                  <Text style={styles.captionText}>{item.caption}</Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
