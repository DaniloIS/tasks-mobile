import { StyleSheet } from 'react-native';
import commonStyles from '../../commonStyles.js';

export default StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10
  },

  subTitle: {
    fontFamily: commonStyles.fontFamily,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },

  formContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    width: '90%',
    justifyContent: 'space-evenly'
  }
})