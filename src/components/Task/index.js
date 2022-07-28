import React from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import 'moment/locale/pt-br';

import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome'

function getCheckView(doneAt) {
  if(doneAt != null) {
    return (
      <View style={styles.done}>
        <Icon name='check' size={30} color="#fff " />
      </View>
    )
  }
  return (
    <View style={styles.pending}></View>
  )
}

const Task = ({ task, toggleTask, onDelete }) => {
  const formatDate = date => moment(date).local('pt-br').format('ddd, D [de] MMM');

  function getRightContent() {
    return (
      <TouchableOpacity style={styles.right} onPress={() => onDelete && onDelete(task.id)}>
        <Icon name='trash' size={30} color='#fff' />
      </TouchableOpacity>
    )
  }

  function getLeftContent() {
    return (
      <View style={styles.left}>
        <Icon name='trash' size={30} color='#fff' style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    )
  }

  return (
    <Swipeable
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => onDelete && onDelete(task.id)}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => toggleTask(task.id)}>
          <View style={styles.checkContainer}>
            {getCheckView(task.doneAt)}
          </View>
        </TouchableWithoutFeedback>
        <View>
          <Text style={[styles.desc, task.doneAt != null &&
          {textDecorationLine: 'line-through'}]}>{task.desc}</Text>
          <Text style={styles.date}>{formatDate(task.doneAt ? task.doneAt : task.estimateAt)}</Text>
        </View>
      </View>
    </Swipeable>
  )
}

export { Task };