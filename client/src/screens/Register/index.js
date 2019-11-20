import React, {useState} from 'react';
import {Button} from 'react-native';
import {Container, Form, FormInput} from './styles';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {addUser} from '../../storage/user';
import Notification from '../../Notification';

const ADD_USER = gql`
  mutation AddUser($user: UserInput!) {
    addUser(user: $user) {
      userId
    }
  }
`;

const validateForm = (name, email, password, reTypedpassword) => {
  if (!name) {
    Notification.show('Name is Required');
    return false;
  }

  if (!email) {
    Notification.show('Email is Required');
    return false;
  }

  if (!password) {
    Notification.show('Password is Required');
    return false;
  }

  if (password !== reTypedpassword) {
    Notification.show('Passwords are Different');
    return false;
  }

  return true;
};

const Register = ({navigation}) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [reTypedpassword, setRetypedPassword] = useState();

  const [addNewUser, {data}] = useMutation(ADD_USER);

  if (data) {
    const {userId} = data;
    addUser({userId, name, email, password}).then(() =>
      navigation.push('Order'),
    );
  }

  return (
    <Container>
      <Form>
        <FormInput
          underlineColorAndroid={'blue'}
          placeholder="Name"
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
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <FormInput
          underlineColorAndroid={'blue'}
          placeholder="Retype Password"
          secureTextEntry={true}
          value={reTypedpassword}
          onChangeText={text => setRetypedPassword(text)}
        />
      </Form>
      <Button
        title="Register"
        onPress={() =>
          validateForm(name, email, password, reTypedpassword) &&
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
