import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native';
import {
  Container,
  ListContainer,
  DetailsContainer,
  Title,
  DetailsText,
  ProductImage,
} from './styles';

const ProductDetail = ({navigation}) => {
  const item = navigation.getParam('item');
  return (
    <ListContainer>
      <ProductImage source={{uri: item.image}}></ProductImage>
      <DetailsContainer>
        <Title>{item && item.name}</Title>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Text>Size: {item && item.size}</Text>
          <Text>Color: {item && item.color}</Text>
        </View>
        <Text style={{alignSelf: 'flex-end', fontSize: 20, fontWeight: '600'}}>
          Price: $ {item && item.price}
        </Text>
        <Button title="Add to cart" type="solid" style={{margin: 5}} />
      </DetailsContainer>
    </ListContainer>
  );
};

ProductDetail.navigationOptions = () => {
  return {
    title: 'Details',
  };
};

export default ProductDetail;
