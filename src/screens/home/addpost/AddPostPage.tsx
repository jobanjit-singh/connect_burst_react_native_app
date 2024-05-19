import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import styles from './Style';
import {TouchableOpacity} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PERMISSIONS, request} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const {width, height} = Dimensions.get('window');

const AddPost = ({navigation}: {navigation: any}) => {
  const [imageData, setImageData] = useState<ImagePickerResponse>();
  const [caption, setCaption] = useState<string>('');
  const [shareButtonText, setShareButtonText] = useState('SHARE');
  const [uid, setUid] = useState('');

  useEffect(() => {
    getUid();
  }, []);

  const getUid = async () => {
    const uid = await AsyncStorage.getItem('UID');
    setUid(uid ? uid : '');
  };

  const handleUpdatePhoto = async () => {
    const status = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    const status1 = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

    if (status == 'granted' || status1 == 'granted') {
      launchImageLibrary({
        mediaType: 'photo',
      }).then(imageResponse => {
        if (imageResponse.didCancel) {
          setImageData(undefined);
        } else {
          setImageData(imageResponse);
        }
      });
    }
  };

  const handleSharePhoto = async () => {
    setShareButtonText('WAIT...');
    let linkOfImage;
    if (imageData) {
      const reference = storage().ref(imageData?.assets[0].fileName);
      await reference.putFile(imageData?.assets[0].uri);
      linkOfImage = await reference.getDownloadURL();
    }
    await firestore()
      .collection('POST')
      .add({
        uid: uid,
        profileImage: linkOfImage ? linkOfImage : '',
        caption: caption,
        like: '0',
        comment: '0',
        likeList: [],
        commentList: [
          {
            userUid: '',
            comment: '',
          },
        ],
      })
      .then(response => {
        setShareButtonText('SHARE');
        navigation.navigate('Home');
        setImageData(undefined);
        setCaption('')
      })
      .catch((error: Error) => {
        setImageData(undefined);
        setCaption('')
        setShareButtonText('SHARE');
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      });
  };

  return (
    <ScrollView style={styles.baseContainer}>
      <View style={styles.uploadBaseContainer}>
        <TouchableOpacity
          style={styles.uploadContainer}
          activeOpacity={0.6}
          onPress={handleUpdatePhoto}>
          {imageData && imageData != undefined ? (
            <Image
              source={{uri: imageData?.assets[0].uri}}
              width={width}
              height={height / 2}
            />
          ) : (
            <View style={styles.noimageContainer}>
              <Ionicons name="cloud-upload" color={'#999'} size={width / 6} />
              <Text style={styles.uploadMediaText}>Upload Media</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.captionBaseContainer}>
        <TextInput
          value={caption}
          onChangeText={text => setCaption(text)}
          placeholder="Caption"
          placeholderTextColor={'#999'}
          style={styles.captionInput}
          multiline={true}
        />
      </View>
      <View style={styles.shareBaseContainer}>
        <TouchableOpacity 
          style={styles.shareButtonContainer}
          onPress={handleSharePhoto}
        >
          <Text style={styles.shareText}>{shareButtonText}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddPost;
