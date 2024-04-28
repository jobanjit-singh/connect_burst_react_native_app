import { Dimensions, StyleSheet } from "react-native";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const styles =StyleSheet.create({
    baseContainer: {
        flex: 1,
        height: HEIGHT,
        width: WIDTH
    },
    logoBaseContainer:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        width: WIDTH / 5,
        height: HEIGHT / 5
    },
    loginText:{
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    inputBaseContainer: {
        flex: 2,
        padding: 20,
        justifyContent: 'space-around'
    },
    dontHaveText:{
        color: '#CCC',
        textAlign:'center'
    },
    buttonBaseContainer: {
        flex: 1,
        padding: 20
    }
})