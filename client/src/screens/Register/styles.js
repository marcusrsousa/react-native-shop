import styled from 'styled-components';

const Container = styled.SafeAreaView`
  flex: 1;
  width: 90%;
  margin-left: 5%;
  justify-content: center;
`;

const Form = styled.ScrollView`
  flex: 1;
`;

const FormInput = styled.TextInput`
  font-size: 18px;
  height: 60px;
  margin-bottom: 20px;
`;

export {Container, Form, FormInput};
