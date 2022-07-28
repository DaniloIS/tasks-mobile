import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';
import { useNavigation } from '@react-navigation/native';
import '../../routes/drawer.routes'

import { Task } from '../../components/Task';
import { AddTask } from '../../components/AddTask';

import todayImage from '../../assets/images/today.jpeg';

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../../commonStyles';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

const initialState = [
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
]

const TaskList = () => {
  const  today = moment().locale('pt-br').format('ddd, D [de] MMMM');
  const [showDoneTasks, setShowDoneTasks] = useState(true);
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({})
  const [tasks, setTasks] = useState([]);

  const navigation = useNavigation();

  async function loadUser() {
    const userStorage = await AsyncStorage.getItem('user')
    setUser(JSON.parse(userStorage))
  }

  useEffect(() => {
    if(user.id) api.get(`/tasks/user/${user.id}`).then(res => {
      setTasks(res.data)
      console.log(res.data)
    })

  }, [user])


  async function loadTasks() {
    const stateString = await AsyncStorage.getItem('tasks');
    const stateTasks = JSON.parse(stateString) || tasks
    setTasks(stateTasks);
  }

  useEffect(() => {
    loadTasks();
    loadUser();
  }, [])

  useEffect(() => {
    filterTasks();
  }, [showDoneTasks, tasks])

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
    AsyncStorage.setItem('tasks', JSON.stringify(tasks))
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

  async function addTask(newTask) {
    if(!newTask.desc || !newTask.desc.trim()) {
      Alert.alert('Dados Inválidos', 'Descrição não informada!')
      return
    }

    const tasksArray = [...tasks];
    console.log(newTask)
    await api.post('/tasks', {
      desc: newTask.desc,
      estimateAt: newTask.estimateAt,
      userId: user.id
    })

    tasksArray.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.estimateAt,
      doneAt: null
    });


    setTasks(tasksArray);
    setShow(false);
  }

  function deleteTask(id) {
    const tasksArray = tasks.filter(task => taks.id !== id);

    setTasks(tasksArray);
  }

  const handleModal = () => setShow(!show)
  return (
    <View style={styles.container}>
      <AddTask show={show} onCancel={handleModal} onSave={addTask} />
      <ImageBackground source={todayImage} style={styles.background}>
        <View style={styles.iconBar}>
        <TouchableOpacity>
            <Icon name='bars' size={20} color={commonStyles.colors.secondary} />
          </TouchableOpacity>
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
          renderItem={({item}) => <Task task={item} toggleTask={toggleTask} onDelete={deleteTask} />}
        />
      </View>
      <TouchableOpacity style={styles.btnAdd} onPress={handleModal} activeOpacity={0.7}>
        <Icon name='plus' size={20} color={commonStyles.colors.secondary} />
      </TouchableOpacity>
    </View>
  )
}

export { TaskList };