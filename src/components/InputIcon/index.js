import React from 'react';
import { View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

const InputIcon = ({label, placeholder, value, bgColor = '#fff', color = '#000', onChange, type = 'default', inputRef, size = ['100%', 46], password, icon }) => {
  return (
    <>
      {label && <Text style={[styles.label, { color: color }]}>{label}</Text>}
      <View style={[styles.input, { backgroundColor: bgColor, color: color, width: size[0], height: size[1] }]}>
        {icon && <Icon name={icon} size={20} color={color} style={{paddingHorizontal: 10}} />}
        <TextInput placeholderTextColor='#e3e3e3' style={{flex: 1, color: color}} ref={inputRef} placeholder={placeholder} value={value} onChangeText={onChange} keyboardType={type} secureTextEntry={password} />
      </View>
    </>
  )
}

export { InputIcon };