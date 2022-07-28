import React, { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { Routes } from './src/routes/routes';

import styles from './styles';

const App = () => {
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const userStorage = AsyncStorage.getItem('user');
    if(userStorage) {
      navigation.navigate('Home');
      setLoading(false);
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
     {loading ?
        <ActivityIndicator color='#fff'  size={60}/>
      :
        <NavigationContainer>
            <Routes />
        </NavigationContainer>
      }
    </SafeAreaView>
  )
}

export default App;