import styled from 'styled-components';

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  height: 250px;
`;
const ListContainer = styled.View`
  width: 100%;
  background-color: #f6f6f6;
  padding: 2px;
  margin: 10px;
  min-height: 250px;
  flex: 1 auto;
`;

const DetailsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const DetailsText = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  align-self: flex-start;
`;

const Title = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  align-self: flex-start;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 150px;
`;

export {
  Container,
  ListContainer,
  DetailsContainer,
  DetailsText,
  Title,
  ProductImage,
};
