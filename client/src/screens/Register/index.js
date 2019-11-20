import React, {useState} from 'react';
import {Button} from 'react-native';
import {Container, FormInput} from './styles';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {addUser} from '../../storage/user';

const ADD_USER = gql`
  mutation AddUser($user: UserInput!) {
    addUser(user: $user) {
      userId
    }
  }
`;

const Register = ({navigation}) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [addNewUser, {data}] = useMutation(ADD_USER);

  if (data) {
    const {userId} = data;
    addUser({userId, name, email, password}).then(() =>
      navigation.push('Order'),
    );
  }

  return (
    <Container>
      <FormInput
        underlineColorAndroid={'blue'}
        placeholder="name"
        value={name}
        onChangeText={text => setName(text)}
      />
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
        title="Register"
        onPress={() =>
          addNewUser({
            variables: {user: {name, email, password}},
          })
        }
        type="solid"
      />
    </Container>
  );
};

Register.navigationOptions = () => {
  return {
    title: 'Register',
  };
};

export default Register;
