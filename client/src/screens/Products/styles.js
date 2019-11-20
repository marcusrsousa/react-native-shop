import styled from 'styled-components';

const Container = styled.SafeAreaView`
  flex: 1;
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
  flex: 1 auto;
  flex-direction: column;
  justify-content: space-between;
`;

const LineDetails = styled.View`
  margin: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  align-self: flex-start;
  min-height: 40px;
`;

const Link = styled.Text`
  font-size: 16px;
  text-decoration: underline;
  color: blue;
  margin-top: 10px;
  margin-right: 10px;
  align-self: flex-end;
`;

const Price = styled.Text`
  align-self: flex-end;
  font-size: 20px;
  font-weight: 600;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 150px;
`;

export {
  Container,
  ListContainer,
  DetailsContainer,
  LineDetails,
  Title,
  ProductImage,
  Link,
  Price,
};
