import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import client from './src/createClient'
import Products from './src/components/Products'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Products />
      </ApolloProvider>
    )
  }
}

export default App