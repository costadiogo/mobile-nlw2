import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

function GiveClasses() {

    const { goBack } = useNavigation();

    function handleNavigateBack() {
        goBack();
    }

    return (
    
        <View style={styles.container} >
            <ImageBackground resizeMode = "contain" source={giveClassesBgImage} style={styles.content}>
                <Text style={styles.title}>Do you want a Proffy?</Text>
                <Text style={styles.description}>
                    To get started, you need to register as a teacher on our web platform.
                </Text>
            </ImageBackground>

            <RectButton onPress={handleNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText} >Great</Text>
            </RectButton>

        </View>   
    
    );
}

export default GiveClasses;