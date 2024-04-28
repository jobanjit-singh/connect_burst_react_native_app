import { Dimensions, StyleSheet } from "react-native";

const WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    baseContainer:{
        padding: 15,
    },
    profilePicBaseContainer: {
        height: WIDTH / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profilePicContainer:{
        width: WIDTH / 5,
        height: WIDTH / 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCC'
    },
    usernameTitle:{
        paddingVertical: 10,
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    profileDetailBaseContainer:{
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
    },
    postCountContainer:{
        flex: 1,
        alignItems: 'center'
    },
    detailTitle:{
        fontSize: 16,
        color: '#FFF'
    },
    detailCount: {
        color: '#CCC',
        fontWeight: 'bold'
    },
    editButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    editButton:{
        padding: 8,
        width: WIDTH / 4,
        borderRadius: 8,
        backgroundColor: '#222222',
        alignItems: 'center'
    },
    editText: {
        color: '#00ABF0',
        fontWeight: 'bold'
    }
})