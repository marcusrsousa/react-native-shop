import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import client from './src/createClient';
import Products from './src/screens/Products';
import Cart from './src/screens/Cart';
import ProductDetail from './src/screens/ProductDetail';
import Filters from './src/screens/Filters';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Order from './src/screens/Order';

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
    Login: {
      screen: Login,
      navigationOptions: Login.navigationOptions,
    },
    Register: {
      screen: Register,
      navigationOptions: Register.navigationOptions,
    },
    Order: {
      screen: Order,
      navigationOptions: Order.navigationOptions,
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
