import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        justifyContent: 'center',
        padding: 20,

    },
    banner: {
        width: '100%',
        resizeMode: 'contain',
    },
    title: {
        fontFamily: 'Poppins_400Regular',
        color: '#FFF',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 80
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold',
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between',
    },

    button: {
        height: 130,
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between',
    },

    buttonPrimary: {
        backgroundColor: '#9871f5',
    },

    buttonSecondary: {
        backgroundColor: '#04d361',
    },

    buttonText: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 18,
    },

    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#FFF',
        fontSize:14,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 40,
    },
});

export default styles;