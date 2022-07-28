import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import backgroundImage from '../../assets/images/login.jpeg';
import { InputIcon } from '../../components/InputIcon';
import { Button } from '../../components/Button';

import { showError, showSuccess } from '../../common';
import api from '../../services/api';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Authentication = () => {
  const [form, setForm] = useState(initialState);
  const [stageNew, setStageNew] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  async function loadUser() {
    const user = await AsyncStorage.getItem('user');
    if(user) {
      navigation.navigate('Home');
      setLoading(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadUser()
  }, [])

  async function handleSubmit() {
    const { name, email, password, confirmPassword } = form;

    if(!stageNew) {
      if(!email || !password) {
        showError('Preencha todos campos corretamen!')
        return
      }
      try {
        const user = await api.post('/auth', {
          email,
          password
        })
        console.log(user.data)
        setForm(initialState);
        AsyncStorage.setItem('user', JSON.stringify(user.data));

        navigation.navigate('Home');
        setLoading(false);
        return
      } catch(err) {
        showError(err)
      }
      return
    }
    if(!name || !email || !password || !confirmPassword) {
      showError('Preencha todos campos corretamen!')
      return
    }

    if(password !== confirmPassword) {
      showError('As senhas não coincidem!')
      return
    }

    try {
      await api.post('/users', form).then(res => {
        console.log(res)
      })
      setForm(initialState);
      showSuccess('Usuário cadastrado com sucesso!');
    } catch(err) {
      showError(err)
    }
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      {loading ? <ActivityIndicator color='#000' size={60} /> :
      <>
        <Text style={styles.title}>Tasks</Text>
        <View style={[styles.formContainer, stageNew ? {  height: 350 } : { height: 250 }]}>
          <Text style={styles.subTitle}>{stageNew ? 'Crie sua conta' : 'Informe seus dados'}</Text>
          {stageNew &&
            <InputIcon placeholder='Name' value={form.name} onChange={e => setForm({ ...form, name: e})} icon='user' />
          }
          <InputIcon placeholder='E-mail' value={form.email} onChange={e => setForm({ ...form, email: e})} icon='at' />
          <InputIcon placeholder='Senha' value={form.password} onChange={e => setForm({ ...form, password: e})} password  icon='lock' />
          {stageNew &&
            <InputIcon placeholder='Confirmação de Senha' value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e})} password icon='lock' />
          }
          <Button label={stageNew ? 'Cadastar' : 'Entrar'} bgColor='#080' color='#fff' onClick={handleSubmit} />
        </View>
        <TouchableOpacity style={{padding: 10}} onPress={() => setStageNew(!stageNew)}>
          <Text style={styles.subTitle}>{stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}</Text>
        </TouchableOpacity>
      </>
      }
    </ImageBackground>
  )
}

export { Authentication };