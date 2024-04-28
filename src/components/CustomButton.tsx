import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const CustomButton = ({
  backgroundColor,
  color,
  text,
  laoding = false,
  onPress
}: {
  backgroundColor: string;
  color: string;
  text: string;
  laoding?: boolean;
  onPress: any
}) => {
  const styles = StyleSheet.create({
    buttonBaseContainer: {
      backgroundColor: backgroundColor,
      padding: 5,
      borderRadius: 10,
      alignItems: 'center',
      height: 40,
      justifyContent: 'center'
    },
    buttonText: {
      color: color,
      fontWeight: 'bold',
      fontSize: 14,
    },
  });

  return (
    <TouchableOpacity 
        style={styles.buttonBaseContainer}
        onPress={onPress}
        >
      {laoding ? (
        <ActivityIndicator color={'#FFF'}/>
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
