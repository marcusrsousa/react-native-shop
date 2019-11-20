import {AlertIOS} from 'react-native';

const Notification = {
  show: message => {
    AlertIOS.alert('Ops', message);
  },
};

export default Notification;
