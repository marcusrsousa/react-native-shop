import styled from 'styled-components';

const Container = styled.SafeAreaView`
  flex: 1;
  width: 90%;
  margin-left: 5%;
  justify-content: center;
`;

const FormInput = styled.TextInput`
  font-size: 18px;
  height: 60px;
  margin-bottom: 20px;
`;

const Link = styled.Text`
  font-size: 16px;
  text-decoration: underline;
  color: blue;
  margin-top: 10px;
  align-self: center;
`;

const Message = styled.Text`
  font-size: 16px;
`;

export {Container, FormInput, Link, Message};
