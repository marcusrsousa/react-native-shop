import styled from 'styled-components';

const Container = styled.SafeAreaView`
  width: 100%;
  background-color: #f6f6f6;
  padding: 2px;
  margin: 10px;
  min-height: 180px;
  flex: 1 auto;
`;

const DetailsContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const PriceView = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: #ddd;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  padding-top: 10px;
`;

const DetailsText = styled.Text`
  font-size: 18px;
  margin-left: 10px;
  align-self: flex-start;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  margin-left: 10px;
  align-self: flex-start;
  margin-bottom: 20px;
  font-weight: bold;
`;

const ProductImage = styled.Image`
  flex: 1;
  height: 100px;
`;

const Price = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-right: 15px;
`;

export {
  Container,
  DetailsContainer,
  PriceView,
  DetailsText,
  Title,
  ProductImage,
  Price,
};
