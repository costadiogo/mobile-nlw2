import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { BorderlessButton, RectButton, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Feather } from '@expo/vector-icons';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {

    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [visibleFilter, setVisibleFilter] = useState(false);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritesTeachers = JSON.parse(response);

                const favoritesTeachersId = favoritesTeachers.map((teacher: Teacher ) => {
                    return teacher.id;
                })

                setFavorites(favoritesTeachersId);
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    });

    function handleFilterVisible() {
        setVisibleFilter(!visibleFilter);
    }

    async function handleFilterSubmit() {

        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        
        setVisibleFilter(false);
        setTeachers(response.data);
    }
    

    return (
        <View style={styles.container} >
            <PageHeader 
                title="Proffys available" 
                headerRight={(
                    <BorderlessButton onPress={handleFilterVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )} 
            >
                { visibleFilter && ( 
                    <View style={styles.searchForm}>
                        <Text style={styles.label} >Subject</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder= "What subject?"  
                            placeholderTextColor= "#c1bccc"                  
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock} >
                                <Text style={styles.label} >Week day</Text>
                                    <TextInput 
                                        style={styles.input}
                                        value={week_day}
                                        onChangeText={text => setWeekDay(text)}
                                        placeholder= "Select the day" 
                                        placeholderTextColor= "#c1bccc"                   
                                    />
                            </View>

                            <View style={styles.inputBlock} >
                                <Text style={styles.label} >Time</Text>
                                    <TextInput 
                                        style={styles.input}
                                        value={time}
                                        onChangeText={text => setTime(text)}
                                        placeholder= "Select the time"
                                        placeholderTextColor= "#c1bccc"                    
                                    />
                            </View>
                        </View>

                        <RectButton onPress={handleFilterSubmit} style={styles.submitButton} >
                            <Text style={styles.submitButtonText} >Filter</Text>
                        </RectButton>
                    </View>
                
                )}
                    
            </PageHeader>

            <ScrollView  
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher ={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
                
            </ScrollView>
        </View>
    );
}

export default TeacherList;