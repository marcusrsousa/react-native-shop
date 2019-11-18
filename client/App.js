import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import client from './src/createClient';
import Products from './src/components/Products';
import Cart from './src/screens/Cart';
import ProductDetail from './src/components/ProductDetail';
import Filters from './src/components/Filters';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Products,
      navigationOptions: Products.navigationOptions,
    },
    Filters: {
      screen: Filters,
      navigationOptions: Filters.navigationOptions,
    },
    ProductDetail: {
      screen: ProductDetail,
      navigationOptions: ProductDetail.navigationOptions,
    },
    Cart: {
      screen: Cart,
      navigationOptions: Cart.navigationOptions,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(RootStack);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}

export default App;
