import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        backgroundColor: 'yellow',
        position: 'relative'
    }   ,
    captionBaseContainer: {
        // flex: 0.4,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / 3,
        backgroundColor: '#000000AA',
        padding: 10,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        position: 'absolute'
    },
    captionTitle: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    captionText:{
        color: '#DDD'
    },
    chatBaseContainer:{
        flex: 1,
    },
    messageItemContainer:{
        alignItems: 'flex-start',
    },
    messageText:{
        maxWidth: '50%',
        color: '#FFF',
        margin: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        textAlign: 'center',
        borderRadius: 20
    },
    inputBaseContainer:{
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#000',
        borderRadius: 20,
        padding: 5
    },
    sendButtonContainer: {
        flex: 0.2,
        backgroundColor: '#00ABF0',
        height: 50,
        marginLeft: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default styles;