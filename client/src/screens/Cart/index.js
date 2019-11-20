import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Container,
  ListContainer,
  DetailsContainer,
  PriceView,
  Title,
  DetailsText,
  ProductImage,
  Price,
} from './styles';
import Quantity from '../../components/Quantity';
import {getCart, removeItem, setCart} from '../../storage/cart';
import {getUser} from '../../storage/user';

const buy = async navigation => {
  const user = await getUser();
  if (user) {
    navigation.push('Order');
    return;
  }
  navigation.push('Login');
};

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
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => setProductToRemove(item)}>
          <Image source={require('../../../assets/trash.png')} />
        </TouchableOpacity>
      </DetailsContainer>
      <PriceView>
        <Quantity
          maxQuantity={item.quantity}
          value={item.qtyToBuy}
          onChange={n => setProductToUpdate({...item, qtyToBuy: n})}
        />
        <Price>
          Price: $ {item && (item.qtyToBuy * item.price).toFixed(2)}
        </Price>
      </PriceView>
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

const Cart = ({navigation}) => {
  const [cart, setProducts] = useState([]);
  const [productToUpdate, setProductToUpdate] = useState({});
  const [productToRemove, setProductToRemove] = useState({});

  const fetchData = async () => {
    const c = await getCart();
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
    <ListContainer>
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
          title="BUY"
          onPress={() => buy(navigation)}
          type="solid"
          style={{margin: 5}}
        />
      </View>
    </ListContainer>
  );
};

Cart.navigationOptions = () => {
  return {
    title: 'Cart',
  };
};

export default Cart;
