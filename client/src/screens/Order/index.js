import React, {useEffect} from 'react';
import {Button} from 'react-native';
import {Container, Title, Message} from './styles';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

import {getUser} from '../../storage/user';
import {getCart, removeCart} from '../../storage/cart';

const ADD_ORDER = gql`
  mutation AddOrder($order: OrderInput!) {
    addOrder(order: $order) {
      id
    }
  }
`;

const generateOrder = async () => {
  const {userId} = await getUser();
  const cart = await getCart();
  return {
    userId,
    products: [
      ...cart.map(({id, qtyToBuy}) => ({
        id,
        qtyToBuy,
      })),
    ],
  };
};

const Order = ({navigation}) => {
  const [addOrder, {data}] = useMutation(ADD_ORDER);
  useEffect(() => {
    generateOrder().then(order => addOrder({variables: {order}}));
  }, []);

  if (data) {
    removeCart();
  }

  return (
    <Container>
      <Title>Congratulations!</Title>
      <Message>Your order id is :{data && data.addOrder.id}</Message>
      <Message>More details you will receive in your email</Message>
      <Button
        title="Back to Products"
        onPress={() => navigation.popToTop()}
        type="solid"
      />
    </Container>
  );
};

Order.navigationOptions = () => {
  return {
    title: 'Order',
    headerLeft: null,
  };
};

export default Order;
