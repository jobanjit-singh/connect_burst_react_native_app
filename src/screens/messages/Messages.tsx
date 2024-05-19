import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
  BackHandler,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import styles from './styles';
import {TouchableOpacity} from 'react-native';

const Messages = ({route}: {route: any}) => {
  const [uid, setUid] = useState('');
  const [userUid, setUserUid] = useState(route.params?.user);
  const [chat, setChat] = useState<any[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getUid();
  }, []);

  useEffect(() => {
    getChat();
  }, [uid]);

  const getUid = async () => {
    const uid = await AsyncStorage.getItem('UID');
    setUid(uid ? uid : '');
  };

  const getChat = () => {
    database()
      .ref(`/chat/${uid}/${userUid}`)
      .on('child_added', v => {
        const list: any = chat;
        console.log(
          `--------------------------FULL VALUES ${JSON.stringify(v.val())}`,
        );
        list.push(v.val());
        setChat(list);
        // console.log(`-----------------------------CHAT ${JSON.stringify(v.forEach)}`)
      });
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

  const handleSendButton = () => {
    database().ref(`/chat/${uid}/${route.params.user}`).push({
      message: input,
      uid: uid,
    });
    database().ref(`/chat/${route.params.user}/${uid}`).push({
      message: input,
      uid: uid,
    });
    setInput('');
    // navigation.navigate('Message')
    sendNotification(
      route.params.user,
      route.params.image,
      route.params.caption,
    );
  };

  const renderChatList = ({item, index}: {item: any; index: number}) => {
    return (
      <View
        style={[
          styles.messageItemContainer,
          {
            alignItems: item.uid == uid ? 'flex-end' : 'flex-start',
          },
        ]}>
        <Text
          style={[
            styles.messageText,
            {backgroundColor: item.uid == uid ? '#00ABF0' : '#000'},
          ]}>
          {item.message}
        </Text>
      </View>
    );
  };

  return (
    <ImageBackground
      style={styles.baseContainer}
      source={{uri: route.params.image}}
      resizeMode="cover">
      {/* <Text style={styles.captionT}>{route.params.user}</Text> */}

      <View style={styles.chatBaseContainer}>
        <FlatList
          initialScrollIndex={chat.length - 1}
          data={chat}
          renderItem={renderChatList}
        />
      </View>

      <View style={styles.inputBaseContainer}>
        <TextInput
          value={input}
          onChangeText={text => setInput(text)}
          style={styles.input}
          placeholder="Enter your message"
          placeholderTextColor={'#999'}
        />
        <TouchableOpacity
          style={styles.sendButtonContainer}
          onPress={handleSendButton}>
          <Ionicons name="send" size={30} color={'#FFF'} />
        </TouchableOpacity>
      </View>
      <View style={styles.captionBaseContainer}>
        <Text style={styles.captionTitle}>Caption</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.captionText}>{route.params.caption}</Text>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Messages;
