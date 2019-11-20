import React, {useState} from 'react';
import {Button} from 'react-native';
import {Container, FormInput, Link} from './styles';
import {useLazyQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {addUser} from '../../storage/user';
import Notification from '../../Notification';

const GET_USER = gql`
  query User($user: UserInput!) {
    user(user: $user) {
      userId
      name
    }
  }
`;

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [getUser, {error, data}] = useLazyQuery(GET_USER);

  if (error) {
    Notification.show('User or Password are Incorrect!');
  }

  if (data) {
    const {userId, name} = data.user;
    addUser({userId, name, email, password}).then(() =>
      navigation.push('Order'),
    );
  }

  return (
    <Container>
      <FormInput
        underlineColorAndroid={'blue'}
        placeholder="E-mail"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <FormInput
        underlineColorAndroid={'blue'}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button
        title="Login"
        onPress={() =>
          getUser({
            variables: {user: {email, password}},
          })
        }
        type="solid"
      />
      <Link onPress={() => navigation.push('Register')}>Register Now</Link>
    </Container>
  );
};

Login.navigationOptions = () => {
  return {
    title: 'Login',
  };
};

export default Login;
