import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, FlatList, TouchableOpacity, Platform } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { Task } from '../Task';

import todayImage from '../../assets/images/today.jpeg';

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../commonStyles';

const TaskList = () => {
  const  today = moment().locale('pt-br').format('ddd, D [de] MMMM');
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [visibleTasks, setVisibleTasks] = useState([]);

  const [tasks, setTasks] = useState([
    { 
      id: 1,
      desc: 'Comprar Livro',
      estimateAt: new Date(),
      doneAt: new Date()
    },
    {
      id: 2,
      desc: 'Ler Livro',
      estimateAt: new Date(),
      doneAt: null
    },
  ]);

  useEffect(() => {
    filterTasks();
  }, [showDoneTasks])

  const toggleFilter = () => setShowDoneTasks(!showDoneTasks);

  function filterTasks() {
    let visTasks = null
    if(showDoneTasks) {
      visTasks = [...tasks]
    } else {
      const pending = task => task.doneAt === null;
      visTasks = tasks.filter(pending)
    }
    setVisibleTasks(visTasks)
  }

  function toggleTask(id) {
    const tasksArray = [...tasks]
    tasksArray.forEach(task => {
      if(task.id === id) {
        task.doneAt = task.doneAt ? null : new Date()
      }
    })

    setTasks(tasksArray);
    filterTasks();
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={toggleFilter}>
            <Icon name={showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commonStyles.colors.secondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        <FlatList
          data={visibleTasks}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Task task={item} toggleTask={toggleTask} />}
        />
      </View>
    </View>
  )
}

export { TaskList };