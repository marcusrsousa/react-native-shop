import React from 'react';
import {FlatList, Text, Image, View} from 'react-native';
import {Button} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Container,
  ListContainer,
  DetailsContainer,
  Title,
  DetailsText,
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
      <Image
        style={{width: 170, height: 250}}
        source={{uri: item.image}}></Image>
      <DetailsContainer>
        <Title>{item && item.name}</Title>
        <DetailsText>Size: {item && item.size}</DetailsText>
        <DetailsText>Color: {item && item.color}</DetailsText>
        <DetailsText>Price: {item && item.price}</DetailsText>
        <DetailsText>Description: {item && item.description}</DetailsText>
        <Button title="Buy" type="solid" style={{margin: 5}} />
      </DetailsContainer>
    </ListContainer>
  );
};

const keyExtractor = item => item.id;

const ProductsList = () => {
  const {loading, error, data, fetchMore} = useQuery(GET_PRODUCTS, {
    variables: {offset: 0, limit: 10},
    notifyOnNetworkStatusChange: true,
  });

  if (data && data.products)
    return (
      <Container>
        <FlatList
          data={data.products}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={() =>
            fetchMore({
              variables: {
                offset: data.products.length + 1,
              },
              updateQuery: (prev, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prev;
                return {
                  products: [...prev.products, ...fetchMoreResult.products],
                };
              },
            })
          }
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            if (loading) return <Text> Loading... </Text>;
            return <View />;
          }}
        />
      </Container>
    );
  else if (loading) return <Text> Loading... </Text>;
};

export default ProductsList;
