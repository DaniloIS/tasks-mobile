import React from 'react';
import { View, TextInput, Text } from 'react-native';

import styles from './styles';

const Input = ({label, placeholder, value, bgColor = '#fff', color = '#000', onChange, type = 'default', inputRef, size = ['100%', 46], password }) => {
  return (
    <>
      {label && <Text style={[styles.label, { color: color }]}>{label}</Text>}
      <TextInput placeholderTextColor='#e3e3e3' style={[styles.input, { backgroundColor: bgColor, color: color, width: size[0], height: size[1] }]} ref={inputRef} placeholder={placeholder} value={value} onChangeText={onChange} keyboardType={type} secureTextEntry={password} />
    </>
  )
}

export { Input };