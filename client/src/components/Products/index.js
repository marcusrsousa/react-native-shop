import React, {useState, useEffect} from 'react';
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
  query Products($filters: FilterProduct, $offset: Int!, $limit: Int!) {
    products(filters: $filters, offset: $offset, limit: $limit) {
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

const cancelFilter = (filters, setVariables) => {
  if (!Object.keys(filters).length) return;
  return (
    <Text
      onPress={() =>
        setVariables({
          filters: {},
          offset: 0,
          limit: 10,
        })
      }>
      Cancel Filter X
    </Text>
  );
};

const renderItem = (item, navigation) => {
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
        <Button
          title="Buy"
          type="solid"
          onPress={() => navigation.push('ProductDetail', {item})}
          style={{margin: 5}}
        />
      </DetailsContainer>
    </ListContainer>
  );
};

const keyExtractor = item => item.id;

const ProductsList = ({navigation}) => {
  const [variables, setVariables] = useState({
    filters: {},
    offset: 0,
    limit: 10,
  });
  const {loading, error, data, refetch, fetchMore} = useQuery(GET_PRODUCTS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch(variables);
  }, [variables]);

  if (!data && loading) return <Text> Loading... </Text>;
  const {products} = data || [];
  if (data && data.products)
    return (
      <Container>
        <Button
          title="Filter"
          onPress={() =>
            navigation.push('Filters', {
              onFilter: filters =>
                setVariables({filters, offset: 0, limit: 10}),
            })
          }
          type="solid"
          style={{margin: 5}}
        />
        {cancelFilter(variables.filters, setVariables)}

        <FlatList
          horizontal={false}
          numColumns={2}
          data={products}
          renderItem={({item}) => renderItem(item, navigation)}
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
