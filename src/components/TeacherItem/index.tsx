import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import heartOutlineIcon from '../../assets/images/icons/heart.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';


import styles from './styles';
import api from '../../services/api';

export interface Teacher {

    id: number,
    avatar: string,
    bio: string,
    cost: number,
    name: string,
    subject: string,
    whatsapp: Number,
    
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {

    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleWhatsappContact() {

        api.post('connections', {
            user_id: teacher.id,
        })


        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    };

    async function handleToggleFavorite() {

        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = [];

        if(favorites) {
            favoritesArray = JSON.parse(favorites);
        }


        if(isFavorited) {
            
            const favoriteIndex = favoritesArray.findIndex((teacherId: Teacher) => {
                return teacherId.id === teacher.id;
            });

            favoritesArray.splice(favoriteIndex, 1);

            setIsFavorited(false);

        } else {

            favoritesArray.push(teacher);

            setIsFavorited(true);

        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));      
    }

    return (
        <View style={styles.container} >
            <View style={styles.profile} >
                <Image style={styles.avatar} source={{ uri: teacher.avatar }} />

                <View style={styles.profileInfo} >
                    <Text style={styles.name}>{teacher.name}</Text>                    
                    <Text style={styles.subject}>{teacher.subject}</Text>                    
                </View>
            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Price/hour {'   '}
                <Text style={styles.priceValue}>{teacher.cost}</Text>
                </Text>

                <View style={styles.buttonContainer}>
                    <RectButton 
                        onPress={handleToggleFavorite}
                        style={[
                        styles.favoriteButton, 
                        isFavorited ? styles.unfavorite : {},
                    ]}>
                        { isFavorited
                            ?<Image source={unfavoriteIcon} />
                            :<Image source={heartOutlineIcon} />
                        }
                    </RectButton>

                    <RectButton onPress={handleWhatsappContact} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText} > Call me</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;