import {ToastAndroid} from 'react-native';

const Notification = {
  show: message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  },
};

export default Notification;
