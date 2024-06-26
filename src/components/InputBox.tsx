import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const InputBox = ({
  height,
  width,
  value,
  onChangeText,
  placeholder,
  secureInput=false
}: {
  height: number;
  width?: number;
  value: string;
  onChangeText: any;
  placeholder: string,
  secureInput?: boolean
}) => {

    const styles = StyleSheet.create({
        inputStyle: {
            width: width,
            height: height,
            borderColor: '#CCC',
            borderWidth: 0.5,
            borderRadius: 10,
            padding: 10,
            color: '#FFF'
        }
    })

  return <View>
    <TextInput 
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#CCC'}
        style={styles.inputStyle}
        secureTextEntry={secureInput}
    />
  </View>;
};

export default InputBox;

