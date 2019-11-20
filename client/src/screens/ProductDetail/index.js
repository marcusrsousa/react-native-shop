import React, {useState} from 'react';
import {Button} from 'react-native';
import {
  Container,
  DetailsContainer,
  Title,
  DetailsText,
  ProductImage,
  PriceView,
  Price,
} from './styles';

import Quantity from '../../components/Quantity';
import {addCart} from '../../storage/cart';

const add = async (navigation, item) => {
  await addCart(item);
  navigation.goBack();
};

const ProductDetail = ({navigation}) => {
  const item = navigation.getParam('item');
  const [qtyToBuy, setQtyToBuy] = useState(1);
  return (
    <Container>
      <ProductImage source={{uri: item.image}}></ProductImage>
      <DetailsContainer>
        <Title>{item && item.name}</Title>
        <DetailsText>Description: {item && item.description}</DetailsText>
        <DetailsText>Brand: {item && item.brand}</DetailsText>
        <DetailsText>Size: {item && item.size}</DetailsText>
        <DetailsText>Color: {item && item.color}</DetailsText>
        <DetailsText>Merchant: {item && item.merchant.name}</DetailsText>
        <PriceView>
          <Quantity
            maxQuantity={item.quantity}
            value={qtyToBuy}
            onChange={n => setQtyToBuy(n)}
          />
          <Price>Price: $ {item && (qtyToBuy * item.price).toFixed(2)}</Price>
        </PriceView>
      </DetailsContainer>
      <Button
        title="Add to cart"
        onPress={() => add(navigation, {...item, qtyToBuy})}
        type="solid"
      />
    </Container>
  );
};

ProductDetail.navigationOptions = () => {
  return {
    title: 'Details',
  };
};

export default ProductDetail;
