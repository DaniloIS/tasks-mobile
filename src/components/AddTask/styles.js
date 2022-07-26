import { StyleSheet } from 'react-native';
import commonStyles from '../../commonStyles';

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  
  container: {
    flex: 2,
    backgroundColor: '#fff'
  },

  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18
  },

  form: {
    flex: 1,
    paddingHorizontal: 20,
    height: '25%',
    justifyContent: 'space-evenly'
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: '#000'
  }
})