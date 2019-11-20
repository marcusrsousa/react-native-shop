import React from 'react';
import {AsyncStorage} from 'react-native';

const addUser = async user =>
  await AsyncStorage.setItem('user', JSON.stringify(user));

const getUser = async () => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const removeUser = async () => await AsyncStorage.removeItem('user');

export {addUser, getUser, removeUser};
