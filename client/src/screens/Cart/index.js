import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, Picker, Button} from 'react-native';
import {
  Container,
  DetailsContainer,
  Title,
  DetailsText,
  ProductImage,
  Price,
} from './styles';
import {getCart, removeItem, setCart} from '../../storage/cart';

const Quantity = ({maxQuantity, value, onChange}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
    }}>
    <Text style={{alignSelf: 'center', fontSize: 20}}>Quantity: </Text>
    <Picker
      style={{width: 100}}
      selectedValue={value}
      onValueChange={n => onChange(n)}>
      {[...Array(maxQuantity).keys()].map(n => {
        const num = n + 1;
        const label = num.toString();
        return <Picker.Item key={n} label={label} value={num} />;
      })}
    </Picker>
  </View>
);

const renderItem = (item, setProductToUpdate, setProductToRemove) => {
  return (
    <Container>
      <DetailsContainer>
        <ProductImage source={{uri: item.image}}></ProductImage>
        <View style={{flex: 2}}>
          <Title>{item && item.name}</Title>
          <DetailsText>Size: {item && item.size}</DetailsText>
          <DetailsText>Color: {item && item.color}</DetailsText>
        </View>
      </DetailsContainer>
      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 5,
          paddingTop: 5,
        }}>
        <Quantity
          maxQuantity={item.quantity}
          value={item.qtyToBuy}
          onChange={n => setProductToUpdate({...item, qtyToBuy: n})}
        />
        <Price>
          Price: $ {item && (item.qtyToBuy * item.price).toFixed(2)}
        </Price>
      </View>
    </Container>
  );
};
const keyExtractor = item => item.id;

const showTotal = cart => {
  const total = cart
    .map(p => p.price * p.qtyToBuy)
    .reduce((acc, curr) => (acc += curr))
    .toFixed(2);
  return (
    <View style={{alignItems: 'flex-end'}}>
      <Price>Total: $ {total}</Price>
    </View>
  );
};

const Cart = () => {
  const [cart, setProducts] = useState([]);
  const [productToUpdate, setProductToUpdate] = useState({});
  const [productToRemove, setProductToRemove] = useState({});

  const fetchData = async () => {
    const c = await getCart();
    console.warn(c);
    if (c.length) setProducts(c);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!Object.keys(productToUpdate).length) return;
    const products = [
      ...cart.filter(item => item.id !== productToUpdate.id),
      productToUpdate,
    ];
    setProducts(products);
    setCart(products);
  }, [productToUpdate]);

  useEffect(() => {
    if (!Object.keys(productToRemove).length) return;
    const products = cart.filter(item => item.id !== productToRemove.id);
    setProducts(products);
    removeItem(productToRemove.id);
  }, [productToRemove]);

  if (!cart.length) return <Text> Chart Empty </Text>;
  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <FlatList
        data={cart}
        renderItem={({item}) =>
          renderItem(item, setProductToUpdate, setProductToRemove)
        }
        keyExtractor={keyExtractor}
      />
      <View>
        {cart && showTotal(cart)}

        <Button
          title="Checkout"
          onPress={() => console.warn('ok')}
          type="solid"
          style={{margin: 5}}
        />
      </View>
    </View>
  );
};

Cart.navigationOptions = () => {
  return {
    title: 'Cart',
  };
};

export default Cart;
