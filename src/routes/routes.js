import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Authentication } from '../screens/Authentication';
import { TaskList } from '../screens/TaskList';

const AppStack = createNativeStackNavigator();

const Routes = () => {
  return (
    <AppStack.Navigator screenOptions={{
      headerShown: false
    }}>
      <AppStack.Screen name='Auth' component={Authentication} />
      <AppStack.Screen name='Home' component={TaskList} />
    </AppStack.Navigator>
  )
}

export { Routes };