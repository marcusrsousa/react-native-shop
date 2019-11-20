import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import {Button} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Container,
  ListContainer,
  DetailsContainer,
  Title,
  LineDetails,
  ProductImage,
  Link,
  Price,
} from './styles';
import {getCart} from '../../storage/cart';
import Notification from '../../Notification';

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
      quantity
      brand
      merchant {
        name
      }
    }
  }
`;

const VARIABLES_INITIAL_VALUE = {
  filters: {},
  offset: 0,
  limit: 20,
};

const handleCart = async navigation => {
  const cart = await getCart();
  if (!cart || cart.length === 0) {
    Notification.show('Cart is empty!');
    return;
  }
  navigation.push('Cart');
};

const cancelFilter = (filters, setVariables) => {
  if (!Object.keys(filters).length) return;
  return (
    <Link onPress={() => setVariables(VARIABLES_INITIAL_VALUE)}>X Filter</Link>
  );
};

const renderItem = (item, navigation) => {
  return (
    <ListContainer>
      <TouchableOpacity
        onPress={() => navigation.push('ProductDetail', {item})}>
        <ProductImage source={{uri: item.image}}></ProductImage>
        <DetailsContainer>
          <Title>{item && item.name}</Title>
          <LineDetails>
            <Text>Size: {item && item.size}</Text>
            <Text>Color: {item && item.color}</Text>
          </LineDetails>
          <Price>Price: $ {item && item.price.toFixed(2)}</Price>
        </DetailsContainer>
      </TouchableOpacity>
    </ListContainer>
  );
};

const keyExtractor = item => item.id;

const ProductsList = ({navigation}) => {
  const [variables, setVariables] = useState(VARIABLES_INITIAL_VALUE);
  const {loading, error, data, refetch, fetchMore} = useQuery(GET_PRODUCTS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data && !loading) refetch(variables);
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
              activeFilters: variables.filters,
              onFilter: filters =>
                setVariables({filters, offset: 0, limit: 20}),
            })
          }
          type="solid"
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
    headerRight: () => (
      <TouchableOpacity
        style={{marginRight: 10}}
        onPress={() => handleCart(navigation)}>
        <Image source={require('../../../assets/cart.png')} />
      </TouchableOpacity>
    ),
  };
};

export default ProductsList;
