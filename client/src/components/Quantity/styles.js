import styled from 'styled-components';

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;
const Label = styled.Text`
  font-size: 20px;
  align-self: center;
`;

const QuantityPicker = styled.Picker`
  width: 100px;
`;

export {Container, Label, QuantityPicker};
