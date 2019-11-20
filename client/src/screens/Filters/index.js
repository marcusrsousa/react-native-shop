import React, {useState} from 'react';
import {Button} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {Container, Form, PriceContainer, FormInput, Label} from './styles';

const Filters = ({navigation}) => {
  const onFilter = navigation.getParam('onFilter');
  const activeFilters = navigation.getParam('activeFilters');
  const [filters, setFilters] = useState(activeFilters);

  let minPriceField, maxPriceField;
  return (
    <Container>
      <Form>
        <FormInput
          underlineColorAndroid={'blue'}
          placeholder="Product..."
          onChangeText={text => setFilters({...filters, product: text})}
        />
        <FormInput
          underlineColorAndroid={'blue'}
          placeholder="Brand..."
          onChangeText={text => setFilters({...filters, brand: text})}
        />
        <FormInput
          underlineColorAndroid={'blue'}
          placeholder="Size..."
          onChangeText={text => setFilters({...filters, size: text})}
        />
        <FormInput
          underlineColorAndroid={'blue'}
          placeholder="Color..."
          onChangeText={text => setFilters({...filters, color: text})}
        />
        <FormInput
          underlineColorAndroid={'blue'}
          placeholder="Merchant..."
          onChangeText={text => setFilters({...filters, merchantName: text})}
        />
        <PriceContainer>
          <TextInputMask
            type={'money'}
            options={{
              precision: 2,
              separator: '.',
              delimiter: ',',
              unit: '$',
              suffixUnit: '',
            }}
            underlineColorAndroid={'blue'}
            placeholder="Min Price"
            value={filters.minPrice}
            style={{fontSize: 18, height: 60, width: 150}}
            onChangeText={text => setFilters({...filters, minPrice: text})}
            ref={ref => (minPriceField = ref)}
          />
          <Label>To</Label>
          <TextInputMask
            type={'money'}
            options={{
              precision: 2,
              separator: '.',
              delimiter: ',',
              unit: '$',
              suffixUnit: '',
            }}
            underlineColorAndroid={'blue'}
            placeholder="Max Price"
            value={filters.maxPrice}
            style={{fontSize: 18, height: 60, width: 150}}
            onChangeText={text => setFilters({...filters, maxPrice: text})}
            ref={ref => (maxPriceField = ref)}
          />
        </PriceContainer>
      </Form>
      <Button
        title="Filter"
        onPress={() => {
          const filtersFormmated = filters;
          if (filters.minPrice) {
            filtersFormmated.minPrice = minPriceField.getRawValue();
          }
          if (filters.maxPrice) {
            filtersFormmated.maxPrice = maxPriceField.getRawValue();
          }
          onFilter(filtersFormmated);
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
