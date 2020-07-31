import {StyleSheet} from 'react-native';

import Theme from '../../../theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Theme.colors.WHITE
    },
    logo: {
        marginBottom: 40
    },
    inputView: {
        width: "90%",
        backgroundColor: Theme.colors.COLOR_INPUT_BACKGROUND,
        borderRadius: 15,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: Theme.colors.BLACK
    },
    loginBtn: {
        width: "90%",
        backgroundColor: Theme.colors.COLOR_DEFAULT,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10
    },
    loginText: {
        color: Theme.colors.WHITE,
        fontSize: 16
    },
    signUpText: {
        color: Theme.colors.BLACK,
        fontSize: 16
    }
});
export default styles;