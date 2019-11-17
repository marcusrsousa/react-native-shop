import client from 'apollo-boost';

const apolloClient = new client({
  uri: Platform.select({
    android: 'http://10.0.2.2.xip.io:8080/graphql',
    ios: 'http://localhost:8080/graphql',
  }),
});

export default apolloClient;
