import {Dimensions, StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: Dimensions.get('window').height / 6,
  },
});

export default style;
