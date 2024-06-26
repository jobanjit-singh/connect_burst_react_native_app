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
        backgroundColor: '#CCC',
        overflow: 'hidden'
    },
    usernameTitle:{
        paddingVertical: 10,
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    profileDetailBaseContainer:{
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
    },
    postListBaseContainer:{
        alignItems: 'center'
    },
    noPostContainer: {
        alignItems: 'center'
    },
    noPostText: {
        color: '#999',
        fontWeight: 'bold'
    },
    itemBaseContainer:{
        width: WIDTH / 1.1,
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 20,
        overflow: 'hidden',
        borderColor: '#00ABF077',
        borderWidth: 1,
        borderStyle: 'dashed'
    },
    captionText: {
        color: '#FFF',
        fontSize: 14,
    }
})