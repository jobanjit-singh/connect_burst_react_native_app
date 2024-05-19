import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PERMISSIONS, request} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';

import {styles} from './Style';
import axios from 'axios';

const LandingPage = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  const [uid, setUid] = useState('');

  useEffect(() => {
    getPostData();
    getUid();
  }, []);

  useEffect(() => {
    if (uid) {
      storeFcmToken();
    }
  }, [uid]);

  const getUid = async () => {
    const uid = await AsyncStorage.getItem('UID');
    setUid(uid ? uid : '');
  };

  const getPostData = () => {
    firestore()
      .collection('POST')
      .onSnapshot(data => {
        const dataPost: any = [];
        data.forEach(post => {
          dataPost.push(post.data());
        });
        setPostData(dataPost);
        setLoading(false);
      });
  };

  const storeFcmToken = async () => {
    await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);

    const token = await messaging().getToken();
    // console.log(`-------------------FCM TOKEN ${token}`);

    if (token) {
      await firestore().collection('FCMTOKEN').doc(uid).set({
        FCMtoken: token,
      });
    }

    messaging().onMessage(async message => {
      console.log(`DONE FORGROUND MESSAGE ${JSON.stringify(message)}`);
      if (message.data?.type == 'Chat') {
        navigation.navigate(message.data?.screen, {
          user: message.data?.user,
          image: message.data?.image,
          caption: message.data?.caption,
        });
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log(`DONE NOTIFICATION ${JSON.stringify(remoteMessage)}`);
    });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(`DONE BAckGround MESSAGE ${JSON.stringify(remoteMessage)}`);
      if (remoteMessage.data?.type == 'Chat') {
        navigation.navigate(remoteMessage.data?.screen, {
          user: remoteMessage.data?.user,
          image: remoteMessage.data?.image,
          caption: remoteMessage.data?.caption,
        });
      }
    });
  };

  const handleChatWithOther = async (
    userId: string,
    url: string,
    caption: string,
  ) => {
    if (userId == uid) {
      ToastAndroid.show('You cannot chat with yourself', ToastAndroid.LONG);
    } else {
      database().ref(`/chat/${uid}/${userId}`).push({
        message: 'Hi',
        uid: uid,
      });
      database().ref(`/chat/${userId}/${uid}`).push({
        message: 'Hi',
        uid: uid,
      });
      // navigation.navigate('Message')
      sendNotification(userId, url, caption);
    }
  };

  const sendNotification = async (
    userId: string,
    imageUrl: string,
    caption: string,
  ) => {
    const userToken = await firestore()
      .collection('FCMTOKEN')
      .doc(userId)
      .get();

    // console.log(`----------------USERTOKEN ${JSON.stringify(userToken.data())}`)
    if (userToken.data()?.FCMtoken) {
      await axios
        .request({
          method: 'post',
          url: 'https://fcm.googleapis.com/fcm/send',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'key=AAAAdmbBXPA:APA91bGNdlEbEtiWMLuOzd22pRUSUW1CEzVqcbki1HXIrPBK7rir81wjBzugTVFrJpugQF2sDFNUCX5dLZ4G4dybCB3LdsdGzbJqE0E-mzWEbc4KTbSjGLt7FcWrpUZoYpAm5SN7EZQI',
          },
          data: {
            to: userToken.data()?.FCMtoken,
            notification: {
              body: 'New Message from Connect Burst',
              title: 'Live Chat',
            },
            data: {
              screen: 'Message',
              user: uid,
              image: imageUrl,
              caption: caption,
              type: 'Chat',
            },
          },
        })
        .then(r => {
          console.log(`--------------------------RESPONSE DONE`);
          navigation.navigate('Message', {
            user: userId,
            image: imageUrl,
            caption: caption,
          });
        })
        .catch((err: Error) => {
          console.log(
            `--------------------------RESPONSE ERror ${JSON.stringify(
              err.message,
            )}`,
          );
        });
    }
  };

  const handlePostRender = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={styles.postBaseContainer}>
        <View style={styles.postImageContainer}>
          <Image
            source={{
              uri: item.profileImage,
            }}
            style={styles.postImage}
          />
        </View>

        <View style={styles.postHeaderContainer}>
          <Text style={styles.postHeaderTitle}>{item.caption}</Text>
        </View>

        <View style={styles.likeCommentContainer}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" color={'#FFF'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleChatWithOther(item.uid, item.profileImage, item.caption)
            }>
            <Ionicons name="chatbubble-outline" color={'#FFF'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.baseContainer}>
      <View style={styles.headerBaseContainer}>
        <View style={styles.headerTitleBaseContainer}>
          <Text style={styles.headerTitleText}>Connect Burst</Text>
        </View>
        <View style={styles.headerLikeButtonContainer}>
          <TouchableOpacity style={styles.headerLikeButton} disabled={true}>
            <Ionicons name="chatbubbles" color={'#00ABF0'} size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator color={'#FFF'} size={30} />
      ) : (
        <View style={styles.postListContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[1]}
            renderItem={({item, index}) => {
              return (
                <View>
                  {index == 0 && (
                    <View>
                      <FlatList data={postData} renderItem={handlePostRender} />
                    </View>
                  )}
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default LandingPage;
