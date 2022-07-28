import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { TaskList } from '../screens/TaskList';
import { Authentication } from '../screens/Authentication';

const Drawer = createDrawerNavigator();

const AppDrawerRoutes = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tasks" component={TaskList} />
    </Drawer.Navigator>
  );
}

export { AppDrawerRoutes };