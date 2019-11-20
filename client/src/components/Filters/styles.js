import styled from 'styled-components';

const Container = styled.SafeAreaView`
  flex: 1;
  height: 250px;
  padding-top: 50px;
  justify-content: space-between;
`;
const Form = styled.ScrollView`
  flex: 1 auto;
`;

const PriceContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const FormInput = styled.TextInput`
  width: 90%;
  margin-left: 5%;
  font-size: 18px;
  height: 60px;
  margin-bottom: 20px;
`;

const Label = styled.Text`
  font-size: 18px;
  margin-top: 20px;
  align-self: baseline;
`;

export {Container, Form, PriceContainer, FormInput, Label};
