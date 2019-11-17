import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import client from './src/createClient';
import Products from './src/components/Products';
import Chart from './src/screens/Chart';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Products,
      navigationOptions: Products.navigationOptions,
    },
    Chart: {
      screen: Chart,
      navigationOptions: Chart.navigationOptions,
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
