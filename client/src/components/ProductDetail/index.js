import React, {useState} from 'react';
import {Picker, View, Text} from 'react-native';
import {Button} from 'react-native';
import {
  Container,
  DetailsContainer,
  Title,
  DetailsText,
  ProductImage,
  Price,
} from './styles';

import {addCart, removeCart} from '../../storage/cart';

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

const ProductDetail = ({navigation}) => {
  const item = navigation.getParam('item');
  const [qtyToBuy, setQtyToBuy] = useState(1);
  return (
    <Container>
      <ProductImage source={{uri: item.image}}></ProductImage>
      <DetailsContainer>
        <Title>{item && item.name}</Title>
        <DetailsText>Description: {item && item.description}</DetailsText>
        <DetailsText>Size: {item && item.size}</DetailsText>
        <DetailsText>Color: {item && item.color}</DetailsText>
        <View
          style={{
            flexDirection: 'row',
            borderTopWidth: 1,
            borderTopColor: '#ddd',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 50,
            paddingTop: 10,
          }}>
          <Quantity
            maxQuantity={item.quantity}
            value={qtyToBuy}
            onChange={n => setQtyToBuy(n)}
          />
          <Price>Price: $ {item && (qtyToBuy * item.price).toFixed(2)}</Price>
        </View>
      </DetailsContainer>
      <Button
        title="Add to cart"
        onPress={() => addCart({...item, qtyToBuy})}
        type="solid"
        style={{margin: 5}}
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
