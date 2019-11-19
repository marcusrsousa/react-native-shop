import React from 'react';
import {AsyncStorage} from 'react-native';

const addCart = async product => {
  const cart = await AsyncStorage.getItem('cart');
  if (cart) {
    await AsyncStorage.setItem(
      'cart',
      JSON.stringify([...JSON.parse(cart), product]),
    );
    return;
  }
  await AsyncStorage.setItem('cart', JSON.stringify([product]));
};

const getCart = async () => {
  const cart = await AsyncStorage.getItem('cart');
  if (cart) {
    return JSON.parse(cart);
  }
  return null;
};

const setCart = async cart =>
  await AsyncStorage.setItem('cart', JSON.stringify(cart));

const removeCart = async () => await AsyncStorage.removeItem('cart');

const removeItem = async productId => {
  const cartString = await AsyncStorage.getItem('cart');
  if (!cartString) {
    return;
  }

  const cart = JSON.parse(cartString).filter(
    product => product.id !== productId,
  );
  setCart(cart);
};

export {addCart, getCart, setCart, removeItem, removeCart};
