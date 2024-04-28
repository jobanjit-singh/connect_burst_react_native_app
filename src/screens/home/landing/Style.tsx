import { Dimensions, StyleSheet } from "react-native";

const WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    baseContainer:{
        flex: 1,
        backgroundColor: '#000'
    },
    headerBaseContainer: {
        width: WIDTH,
        height: WIDTH / 8,
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    headerTitleBaseContainer:{
        flex: 2,
        justifyContent: 'center',
    },
    headerTitleText:{
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    headerLikeButtonContainer:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    headerLikeButton:{
        flex: 1,
        justifyContent: 'center'
    },
    postListContainer:{
        flex: 1,
        padding: 15,
    },
    postBaseContainer:{
        backgroundColor: '#222222',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10
    },
    postHeaderContainer:{
        paddingBottom: 10
    },
    postHeaderTitle: {
        color: '#FFF',
    },
    postImageContainer:{

    },
    postImage:{
        // width: WIDTH / 3,
        height: WIDTH,
        borderRadius: 8
    },
    likeCommentContainer:{
        justifyContent: 'space-between',
        marginTop: 10,
        flexDirection: 'row'
    }
})