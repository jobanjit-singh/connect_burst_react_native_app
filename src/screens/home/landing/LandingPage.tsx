import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {styles} from './Style';

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handlePostRender = ({item, index}: {item: any; index: number}) => {
    return (
      <View style={styles.postBaseContainer}>
        <View style={styles.postHeaderContainer}>
          <Text style={styles.postHeaderTitle}>{`official_jitcode`}</Text>
        </View>

        <View style={styles.postImageContainer}>
          <Image
            source={{
              uri: item,
            }}
            style={styles.postImage}
          />
        </View>

        <View style={styles.likeCommentContainer}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" color={'#FFF'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
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
          <TouchableOpacity style={styles.headerLikeButton}>
            <Ionicons name="heart" color={'#FF0000'} size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator color={'#FFF'} size={30} />
      ) : (
        <View style={styles.postListContainer}>
          <FlatList
            data={[1]}
            renderItem={({item, index}) => {
              return (
                <View>
                  {index == 0 && (
                    <View>
                      <FlatList
                        data={[
                          'https://cdn.pixabay.com/photo/2023/12/07/19/45/tiger-8436227_640.jpg',
                          'https://cdn.pixabay.com/photo/2022/11/28/17/47/cosmos-7622740_960_720.jpg',
                          'https://cdn.pixabay.com/photo/2023/05/23/07/05/royal-gramma-basslet-8012082_640.jpg',
                          'https://cdn.pixabay.com/photo/2023/09/16/20/14/ai-generated-8257503_640.jpg',
                        ]}
                        renderItem={handlePostRender}
                      />
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
