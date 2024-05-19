import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        padding: 10,
    },
    uploadBaseContainer:{

    },
    uploadContainer: {
        width: '100%',
        height: height / 2,
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 20,
        borderColor: '#999',
        borderWidth: 1,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    noimageContainer:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    uploadMediaText:{
        color: '#999',
        fontWeight: 'bold'
    },
    captionBaseContainer:{
        marginVertical: 10
    },
    captionInput:{
        backgroundColor: '#333',
        width: '100%',
        height: height / 4,
        borderRadius: 20,
        textAlignVertical: 'top',
        padding: 10,
        color: '#FFF'
    },
    shareBaseContainer:{
        marginBottom: 80
    },
    shareButtonContainer:{
        backgroundColor: '#00ABF0',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shareText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default styles;