import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {Button} from 'react-native';
import {
  Container,
  ListContainer,
  DetailsContainer,
  Title,
  DetailsText,
  ProductImage,
} from './styles';

const Filters = ({navigation}) => {
  const onFilter = navigation.getParam('onFilter');
  const [filters, setFilters] = useState({});
  return (
    <Container>
      <Title>Size:</Title>
      <TextInput onChangeText={text => setFilters({...filters, size: text})} />
      <Title>Color:</Title>
      <TextInput onChangeText={text => setFilters({...filters, color: text})} />
      <Button
        title="Filter"
        onPress={() => {
          onFilter(filters);
          navigation.goBack();
        }}
        type="solid"
        style={{margin: 5}}
      />
    </Container>
  );
};

Filters.navigationOptions = () => {
  return {
    title: 'Filters',
  };
};

export default Filters;
