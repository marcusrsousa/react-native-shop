import styled from 'styled-components';

const Container = styled.SafeAreaView`
  flex: 1;
  width: 90%;
  margin-left: 5%;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 22px;
  margin-bottom: 20px;
`;

const Message = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`;

export {Container, Title, Message};
