import React from 'react';
import { SafeAreaView } from 'react-native';

import { TaskList } from './src/screens/TaskList';

import styles from './styles';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TaskList />
    </SafeAreaView>
  )
}

export default App;