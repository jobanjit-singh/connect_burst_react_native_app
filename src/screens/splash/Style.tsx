import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 2
    }
})