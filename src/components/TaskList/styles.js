import { Platform, StyleSheet } from 'react-native';
import commonStyles from '../../commonStyles';

export default StyleSheet.create({
  container: {
    flex: 1
  },

  background: {
    flex: 3
  },

  taskList: {
    flex: 7,
    backgroundColor: '#fff'
  },

  titleBar: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20
  },

  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },

  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 40 : 10
  }
})