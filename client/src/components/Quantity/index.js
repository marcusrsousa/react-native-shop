import React from 'react';
import {Picker} from 'react-native';
import {Container, Label, QuantityPicker} from './styles';
const Quantity = ({maxQuantity, value, onChange}) => (
  <Container>
    <Label>Quantity: </Label>
    <QuantityPicker selectedValue={value} onValueChange={n => onChange(n)}>
      {[...Array(maxQuantity).keys()].map(n => {
        const num = n + 1;
        const label = num.toString();
        return <Picker.Item key={n} label={label} value={num} />;
      })}
    </QuantityPicker>
  </Container>
);

export default Quantity;
