import React, { useState } from 'react';
import { View, Modal, TouchableWithoutFeedback, Text, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import { Input } from '../Input';
import { Button } from '../Button';

import styles from './styles';
import commonStyles from '../../commonStyles';

const initialState = {
  desc: '',
  date: new Date()
};

const AddTask = ({ onCancel, show, onSave }) => {
  const [form, setForm] = useState(initialState);

  const [showDatePicker, setShowDatePicker] = useState(false);

  function save() {
    const newTask = form;

    onSave && onSave(newTask)
    setForm(initialState)
  }

  function getDateTimePicker() {
    let datePicker = <DateTimePicker
      value={form.date}
      onChange={(_, date) => {{
        setForm({ ...form, date: date})}
        setShowDatePicker(false)
      }}
      mode='date'
    />

    const dateString = moment(form.date).format('ddd, D [de] MMMMM [de] YYYY')

    if(Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.date}>
              {dateString}
            </Text>
          </TouchableOpacity>
          {showDatePicker && datePicker}
        </View>
      )
    }

    return datePicker
  }

  return (
    <Modal transparent={true} visible={show} onRequestClose={onCancel} animationType='slide'>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>Nova Tarefa</Text>
        <View style={styles.form}>
          <Input placeholder='Informe a Descrição...' value={form.desc} onChange={e => setForm({ ...form, desc: e})} />
          {getDateTimePicker()}
          <View style={styles.buttons}>
            <Button label='Cancelar' size={['35%', 46]} onClick={onCancel} bgColor={commonStyles.colors.today} color='#fff' />
            <Button label='Salvar' size={['35%', 46]} color={commonStyles.colors.today} onClick={save} />
          </View>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export { AddTask };