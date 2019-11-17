import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {Button} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Container,
  ListContainer,
  DetailsContainer,
  Title,
  DetailsText,
  ProductImage,
} from './styles';

const GET_PRODUCTS = gql`
  query Products($offset: Int!, $limit: Int!) {
    products(filters: {}, offset: $offset, limit: $limit) {
      id
      name
      price
      description
      color
      size
      image
    }
  }
`;

const renderItem = ({item}) => {
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
        <Button title="Buy" type="solid" style={{margin: 5}} />
      </DetailsContainer>
    </ListContainer>
  );
};

const keyExtractor = item => item.id;

const ProductsList = ({navigation}) => {
  const {loading, error, data, fetchMore} = useQuery(GET_PRODUCTS, {
    variables: {offset: 0, limit: 10},
    notifyOnNetworkStatusChange: true,
  });

  if (!data && loading) return <Text> Loading... </Text>;
  const {products} = data || [];
  if (data && data.products)
    return (
      <Container>
        <FlatList
          horizontal={false}
          numColumns={2}
          data={products}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={() =>
            fetchMore({
              variables: {
                offset: products.length + 1,
              },
              updateQuery: (prev, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prev;
                return {
                  products: [...prev.products, ...fetchMoreResult.products],
                };
              },
            })
          }
          onEndReachedThreshold={0.1}
          ListFooterComponent={() => {
            if (loading) return <Text> Loading... </Text>;
            return <View />;
          }}
        />
      </Container>
    );
  else console.error(error);
};

ProductsList.navigationOptions = ({navigation}) => {
  return {
    title: 'Products',
  };
};

export default ProductsList;
