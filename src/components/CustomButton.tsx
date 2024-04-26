import React from "react";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({
    backgroundColor,
    color,
    text
}: {
    backgroundColor: string,
    color: string,
    text: string
}) => {

    const styles = StyleSheet.create({
        buttonBaseContainer: {
            backgroundColor: backgroundColor,
            padding: 10,
            borderRadius: 10,
            alignItems: 'center'
        },
        buttonText:{
            color: color,
            fontWeight: 'bold',
            fontSize: 18
        }
    })

    return(
        <TouchableOpacity
            style={styles.buttonBaseContainer}
        >   
            <Text style={styles.buttonText} >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomButton;