import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import todayImage from '../../assets/images/today.jpeg';

import styles from './styles';

const TaskList = () => {
  const  today = moment().locale('pt-br').format('ddd, D [de] MMMM')
  return (
    <View style={styles.container}>
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <Text>TaskList</Text>
      </View>
    </View>
  )
}

export { TaskList };